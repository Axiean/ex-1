import { Product } from "@library/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
  quantity: number;
}

interface BasketState {
  items: CartItem[];
}

const initialState: BasketState = {
  items: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: {
        rate: 3.9,
        count: 120,
      },
      quantity: 1,
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: {
        rate: 4.1,
        count: 259,
      },
      quantity: 1,
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: {
        rate: 4.7,
        count: 500,
      },
      quantity: 2,
    },
  ],
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
