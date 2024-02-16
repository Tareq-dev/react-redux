import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};
const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { add, remove } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return data.products;
});
