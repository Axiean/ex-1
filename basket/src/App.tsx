import type { CartItem } from "@library/types";
import { List } from "antd";
import React from "react";
import { BasketItem } from "./components/BasketItem";
import { BasketTotals } from "./components/BasketTotals";
import { EmptyBasket } from "./components/EmptyBasket";
import { useMediaQuery } from "@library/hooks";

interface BasketProps {
  items?: CartItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
}

const App: React.FC<BasketProps> = ({
  items = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
