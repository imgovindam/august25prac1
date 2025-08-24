import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer, // for cart management
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
