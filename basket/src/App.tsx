import type { CartItem } from "@library/types";
import { List } from "antd";
import React from "react";
import { BasketItem } from "./components/BasketItem";
import { BasketTotals } from "./components/BasketTotals";
import { EmptyBasket } from "./components/EmptyBasket";
import { useMediaQuery } from "@library/hooks";

interface BasketProps {
  /**
   * An array of items currently in the user's shopping basket.
   * Defaults to an empty array to ensure the component can render in a standalone or loading state.
   */
  items?: CartItem[];
  /**
   * Callback function triggered when a user initiates the removal of an item.
   * The function receives the item's `id` as an argument.
   */
  onRemoveItem?: (id: number) => void;
  /**
   * Callback for when a user adjusts the quantity of a specific item.
   * Receives the item's `id` and the new `quantity`.
   */
  onUpdateQuantity?: (id: number, quantity: number) => void;
}

/**
 * @component App (Basket)
 * @description The main component for the basket remote application.
 * It acts as the primary view for the shopping cart, responsible for displaying basket items
 * and totals. It is designed to be consumed by a host application, receiving its state
 * and behavior via props. This decouples the basket's UI from the application's main state management.
 */
const App: React.FC<BasketProps> = ({
  items = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
}) => {
  // Leverage the shared media query hook to adapt the layout for mobile devices.
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Memoization could be considered here if calculation becomes expensive,
  // but for a typical basket size, this is performant enough.
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const containerStyle: React.CSSProperties = {
    margin: "0 auto",
    maxWidth: isMobile ? "95%" : "50%",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  // Conditionally render the basket's content or an empty state.
  // This avoids presenting a confusing UI to users with no items in their cart.
  if (items.length > 0) {
    return (
      <div style={containerStyle}>
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <BasketItem
              item={item}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          )}
        />
        <BasketTotals subtotal={subtotal} />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, atque!
        </p>
      </div>
    );
  } else {
    return <EmptyBasket />;
  }
};

export default App;
