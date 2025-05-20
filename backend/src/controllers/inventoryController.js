// src/controllers/inventoryController.js
import Alcohol from "../models/Alcohol.js";

export const getInventory = async (req, res) => {
  const items = await Alcohol.find();
  res.json(items);
};

export const addItem = async (req, res) => {
  const newItem = await Alcohol.create(req.body);
  res.status(201).json(newItem);
};
