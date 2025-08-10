import { Spin } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  CartItem,
  removeFromBasket,
  updateQuantity,
} from "../store/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Head from "next/head";
import { withErrorBoundary } from "@library/hocs";

interface BasketProps {
  items: CartItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
}

const Basket = dynamic<BasketProps>(() => import("basket/Basket"), {
  ssr: false,
  loading: () => <Spin fullscreen />,
});

const SafeBasket = withErrorBoundary(Basket);

const BasketPage: NextPage = () => {
  const basketItems = useAppSelector((state) => state.basket.items);

  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <SafeBasket
        items={basketItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
};

export default BasketPage;
