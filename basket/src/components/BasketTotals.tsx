import { Button, Divider, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface BasketTotalsProps {
  subtotal: number;
}

export const BasketTotals: React.FC<BasketTotalsProps> = ({ subtotal }) => {
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Divider />
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text>Shipping</Text>
          <Text>${shipping.toFixed(2)}</Text>
        </div>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Text strong>Total</Text>
        <Text strong>${total.toFixed(2)}</Text>
      </div>
      <div style={{ padding: "16px" }}>
        <Button type="primary" block size="large">
          Checkout
        </Button>
      </div>
    </>
  );
};
