import type { CartItem } from "@/library/types";
import { List } from "antd";
import React from "react";
import { BasketItem } from "./components/BasketItem";
import { BasketTotals } from "./components/BasketTotals";
import { EmptyBasket } from "./components/EmptyBasket";

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
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length) {
    return (
      <div>
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
      </div>
    );
  } else {
    return <EmptyBasket />;
  }
};

export default App;
