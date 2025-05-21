// src/routes/inventoryRoutes.js
import express from "express";
import {
  getInventory,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/inventoryController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getInventory);
router.post("/", authenticate, authorizeAdmin, addItem);
router.put("/:id", authenticate, authorizeAdmin, updateItem);
router.delete("/:id", authenticate, authorizeAdmin, deleteItem);

export default router;
