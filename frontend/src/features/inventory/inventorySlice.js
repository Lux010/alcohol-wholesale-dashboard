// src/features/inventory/inventorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInventory } from "./inventoryAPI"; // Your API service

export const loadInventory = createAsyncThunk(
  "inventory/load",
  async () => await fetchInventory()
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addItem, updateItem } = inventorySlice.actions;
export default inventorySlice.reducer;
