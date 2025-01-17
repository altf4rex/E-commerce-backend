import { fetchProducts } from "../models/productModel.js";

export async function getAllProducts(req, res) {
  try {
    const filters = req.query; // Extract filters from query
    const products = await fetchProducts(filters); // Use model function
    res.status(200).json(products); // Send response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
