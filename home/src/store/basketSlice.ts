import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsApi";

export interface CartItem extends Product {
  quantity: number;
}

interface BasketState {
  items: CartItem[];
}

const initialState: BasketState = {
  items: [],
};

interface UpdateQuantityPayload {
  id: number;
  quantity: number;
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const itemInBasket = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInBasket) {
        itemInBasket.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const itemInBasket = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInBasket) {
        itemInBasket.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;
