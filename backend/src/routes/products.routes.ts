import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router = Router();

// Using the combined middleware
router.post("/products", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);

// Routes without validation
router.get("/products", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);

export default router;
