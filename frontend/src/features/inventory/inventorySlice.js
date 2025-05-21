import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InventoryService from "../../services/inventory.service";

// Async thunks
export const loadInventory = createAsyncThunk(
  "inventory/load",
  async (_, thunkAPI) => {
    try {
      return await InventoryService.fetchInventory();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "inventory/create",
  async (product, thunkAPI) => {
    try {
      return await InventoryService.createProduct(product);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
        state.error = action.payload;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default inventorySlice.reducer;
