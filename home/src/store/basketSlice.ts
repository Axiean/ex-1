import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsApi";

interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      // Simple logic to add a product. You can add logic to check for duplicates later.
      state.items.push(action.payload);
    },
    // You can add other reducers like removeFromBasket, clearBasket, etc. here
  },
});

export const { addToBasket } = basketSlice.actions;

export default basketSlice.reducer;
