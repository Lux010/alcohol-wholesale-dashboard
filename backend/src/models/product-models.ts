import pool from "../config/database";

interface Product {
  id?: number;
  name: string;
  description?: string;
  created_at?: Date;
}

const productModels = {
  async findAll(): Promise<Product[]> {
    const [rows] = await pool.query("SELECT * FROM products");
    console.log("[SQL]", "SELECT * FROM products");
    return rows as Product[];
  },

  async findById(id: number): Promise<Product | null> {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    console.log("[SQL]", `SELECT * FROM products WHERE id = ${id}`);
    const result = rows as Product[];
    return result.length ? result[0] : null;
  },

  async create(product: Product): Promise<number> {
    const [result] = await pool.query("INSERT INTO products SET ?", product);
    console.log("[SQL]", `INSERT INTO products SET ${product}`);
    return (result as any).insertId;
  },

  async update(id: number, product: Partial<Product>): Promise<boolean> {
    const [result] = await pool.query("UPDATE products SET ? WHERE id = ?", [
      product,
      id,
    ]);
    console.log("[SQL]", `UPDATE products SET ${product} WHERE id = ${id}`);
    return (result as any).affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    console.log("[SQL]", `DELETE FROM products WHERE id = ${id}`);
    return (result as any).affectedRows > 0;
  },
};

export default productModels;
