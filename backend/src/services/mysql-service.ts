import mysql, { QueryOptions, format } from "mysql2";
import { logger } from "./logger";

class MySQLService {
  private _client?: mysql.Pool;

  get client() {
    if (!this._client) {
      throw new Error(
        "Cannot access MySQL client before creating connection pool."
      );
    }
    return this._client;
  }

  connect(params: any): Promise<void> {
    this._client = mysql.createPool(params);

    return new Promise((resolve, reject) => {
      this.client.getConnection((err, connection) => {
        if (err) {
          connection.release();
          reject(err);
        } else {
          console.log(
            `Connected to MySQL: Host=${params.host}, Database=${params.database}`
          );
          connection.release();
          resolve();
        }
      });
    });
  }

  ExecuteQuery = async (sql: string | QueryOptions) =>
    new Promise((resolve, reject) => {
      this.client.getConnection((err, connection) => {
        if (err) {
          connection.release();
          reject(err);
        } else {
          if (typeof sql === "string") {
            // Log the complete query string
            console.debug("Executing query:", sql);
            connection.query(sql, (error, result) => {
              connection.release();
              if (error) {
                reject(error);
              }
              resolve(result);
            });
          } else {
            // Construct the complete query string with values
            const completeQuery = format(sql.sql, sql.values || []);
            // Log the complete query string
            console.debug("Executing query:", completeQuery);
            connection.query(sql, (error, result) => {
              connection.release();
              if (error) {
                reject(error);
              }
              resolve(result);
            });
          }
        }
      });
    });

  StartTransaction = async () => {
    await this.ExecuteQuery("START TRANSACTION");
  };
  Rollback = async () => {
    await this.ExecuteQuery("ROLLBACK");
  };
  Commit = async () => {
    await this.ExecuteQuery("COMMIT");
  };
}

export const mysqlService = new MySQLService();
