import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const { id, quantity = 1, title, thumbnail, price } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity += quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.push({ id, quantity, title, thumbnail, price });
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      return state.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
