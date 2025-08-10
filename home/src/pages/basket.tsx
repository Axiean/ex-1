import { Spin } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { removeFromBasket, updateQuantity } from "../store/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Head from "next/head";
import { withErrorBoundary } from "@library/hocs";
import type { CartItem } from "@library/types";

interface BasketProps {
  items: CartItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
}

/**
 * @summary Dynamically imports the Basket UI component from the 'basket' remote.
 * @description This approach is ideal for client-rendered micro-frontends. The host
 * (`home`) retains control over data fetching and state management, dynamically loading
 * the presentational component from the remote (`basket`) only when needed.
 * - `ssr: false` is critical here, as the remote 'basket' is a standard React app and
 * is not configured for Next.js SSR.
 * - This pattern creates a clear separation of concerns: the host handles logic,
 * while the remote handles the view.
 */
const Basket = dynamic<BasketProps>(() => import("basket/Basket"), {
  ssr: false,
  loading: () => <Spin fullscreen />,
});

const SafeBasket = withErrorBoundary(Basket);

/**
 * @page BasketPage
 * @description This page acts as the host container for the remote basket component.
 * It connects to the application's Redux store to fetch the current basket state
 * and provides callback functions to handle user interactions like removing items
 * or updating quantities.
 */
const BasketPage: NextPage = () => {
  const basketItems = useAppSelector((state) => state.basket.items);
  const dispatch = useAppDispatch();

  // --- Event Handlers ---
  // These handlers are defined in the host and passed down to the remote component.
  // This maintains a unidirectional data flow and keeps the remote component purely presentational.

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
