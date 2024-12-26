import { Request, Response } from "express";
import { pool } from "../db/db";

const getAllProducts = async (req: Request, res: Response) => {
  const limit = 8;
  const { page = 1 } = req.query;
  const offset = (+page - 1) * limit;
  try {
    const products = await pool.query(
      "SELECT * FROM product LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const totalProducts = await pool.query("SELECT COUNT(*) FROM product");
    const total = totalProducts.rows[0].count;
    const numOfPages = Math.ceil(+total / limit);
    res.status(200).json({
      products: products.rows,
      totalProducts: total,
      numOfPages,
    });
  } catch (error) {
    res.status(500).json({ msg: "An Error Occured" });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await pool.query("SELECT * FROM product WHERE id= $1", [
      id,
    ]);
    if (product.rows.length === 0) {
      res.status(404).json({ msg: `Product with the id ${id} doesn't exist` });
    }
    res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json("An error occured");
  }
};

export { getAllProducts, getSingleProduct };
