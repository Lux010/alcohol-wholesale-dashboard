// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import ProductService from "../../services/product.service";

// export const getAllProducts = createAsyncThunk(
//   "products/getAll",
//   async (_, thunkAPI) => {
//     try {
//       return await ProductService.getAllProducts();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// export const createProductThunk = createAsyncThunk(
//   "products/create",
//   async (product, thunkAPI) => {
//     try {
//       return await ProductService.createProduct(product);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: {
//       data: [],
//     },
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getAllProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(getAllProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(createProductThunk.pending, (state) => {
//         // Optionally add loading state for create operation
//       })
//       .addCase(createProductThunk.fulfilled, (state, action) => {
//         // Add the new product to the beginning of the list
//         if (state.items.data) {
//           state.items.data.unshift(action.payload);
//         }
//       })
//       .addCase(createProductThunk.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../services/product.service";

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await ProductService.getAllProducts();
      // Backend returns { success: true, data: [...], total: number }
      return response;
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
      console.log("Creating product in thunk:", product);
      const response = await ProductService.createProduct(product);
      console.log("Response from service:", response);

      // Validate response
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      return response.data; // Return just the product data
    } catch (err) {
      console.error("Error in createProductThunk:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, product }, thunkAPI) => {
    try {
      const response = await ProductService.updateProduct(id, product);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await ProductService.deleteProduct(id);
      return id; // Return the deleted product ID
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
    items: {
      data: [],
      total: 0,
    },
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: "idle", // Track create operation status separately
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Debug logging
        console.log("getAllProducts response:", action.payload);

        // Ensure we have the right data structure
        if (action.payload && action.payload.data) {
          state.items = action.payload;
        } else if (Array.isArray(action.payload)) {
          // Handle case where backend returns array directly
          state.items = {
            data: action.payload,
            total: action.payload.length,
          };
        } else {
          console.warn("Unexpected response format:", action.payload);
          state.items = {
            data: [],
            total: 0,
          };
        }
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle createProductThunk
      .addCase(createProductThunk.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        // Add the new product to the beginning of the list
        if (state.items.data && action.payload) {
          // Debug logging
          console.log("Adding new product to state:", action.payload);

          // Ensure the product has required fields
          const newProduct = {
            id: action.payload.id,
            name: action.payload.name || "",
            brand: action.payload.brand || "",
            category: action.payload.category || "Spirits",
            abv: action.payload.abv || 0,
            quantity: action.payload.quantity || 0,
            price: action.payload.price || 0,
            status: action.payload.status || "In Stock",
            emoji: action.payload.emoji || "🍾",
            supplierId: action.payload.supplierId || null,
            createdAt: action.payload.createdAt || new Date().toISOString(),
            updatedAt: action.payload.updatedAt || new Date().toISOString(),
          };

          state.items.data.unshift(newProduct);
          state.items.total = (state.items.total || 0) + 1;
        }
        state.error = null;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      // Handle updateProductThunk
      .addCase(updateProductThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        // Update the product in the list
        if (state.items.data) {
          const index = state.items.data.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.items.data[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle deleteProductThunk
      .addCase(deleteProductThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        // Remove the product from the list
        if (state.items.data) {
          state.items.data = state.items.data.filter(
            (p) => p.id !== action.payload
          );
          state.items.total = Math.max((state.items.total || 0) - 1, 0);
        }
        state.error = null;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, resetCreateStatus } = productSlice.actions;
export default productSlice.reducer;
