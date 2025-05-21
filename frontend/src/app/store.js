import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/inventory/productSlice";

export const store = configureStore({
  reducer: {
    inventory: productSlice,
  },
});
