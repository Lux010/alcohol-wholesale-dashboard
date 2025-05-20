import express from "express";
import mongoose from "mongoose";
import inventoryRoutes from "./routes/inventoryRoutes.js";

// Add this at the VERY TOP of your entry file (app.js/server.js)
console.log("--- Starting Server ---"); // This should appear immediately

// Enable proper logging
process.env.DEBUG = "express:*";
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/inventory", inventoryRoutes);

// Add these before mongoose.connect()
mongoose.connection.on("connecting", () =>
  console.log("Connecting to MongoDB...")
);
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from MongoDB")
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit with error
  });

// Then your existing code...
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("\n✅ Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    });

    // Prevent immediate exit
    server.keepAliveTimeout = 60000;
  })
  .catch((err) => {
    console.error("\n❌ MongoDB connection error:", err);
    process.exit(1);
  });
