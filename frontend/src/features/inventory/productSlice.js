import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../services/product.service";

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await ProductService.getAllProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/create",
  async (product, thunkAPI) => {
    try {
      return await ProductService.createProduct(product);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // add the new item to the top
      });
  },
});

export default productSlice.reducer;
