import { Request, Response, NextFunction } from "express";
import { mysqlService } from "common";
import { ForbiddenError } from "../errors/forbidden-error";

export const requirePermission =
  (permName: String) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // Set USERID variable for audit purposes
    await mysqlService.ExecuteQuery({
      sql: "SET @USERID = ?",
      values: [req.currentUser?.user_id],
    });
    // Check if user has admin role.
    // The Admin role has permissions to do everything.
    const hasAdminRole = req.currentUser?.user_roles.includes("admin");
    if (hasAdminRole) {
      next();
      return;
    }
    const result = (await mysqlService.ExecuteQuery({
      sql: `SELECT 'True' FROM usr_role_permissions RP
          INNER JOIN usr_roles R ON RP.role_id = R.role_id
          INNER JOIN usr_permissions P ON RP.perm_id = P.perm_id
          WHERE P.perm_name = ? AND
          R.role_id IN (SELECT UR.role_id FROM usr_user_roles UR
          INNER JOIN usr_users U ON UR.user_id = U.user_id
          WHERE U.user_id = ?)`,
      values: [permName, req.currentUser?.user_id],
    })) as String[];

    if (result.length > 0) {
      next();
    } else {
      throw new ForbiddenError();
    }
  };
