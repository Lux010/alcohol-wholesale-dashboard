// src/models/Alcohol.js
import mongoose from "mongoose";

const AlcoholSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  category: { type: String, enum: ["whiskey", "vodka", "gin", "rum", "wine"] },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Alcohol", AlcoholSchema);
