import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productsRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
