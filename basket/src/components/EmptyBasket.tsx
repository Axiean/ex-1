import { Button, Empty } from "antd";
import React from "react";

export const EmptyBasket = (): React.ReactNode => {
  return (
    <Empty description="Your cart is currently empty.">
      <Button href="/" type="primary">
        Continue Shopping
      </Button>
    </Empty>
  );
};
