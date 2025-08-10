import React from "react";
import { Button, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface QuantityControlProps {
  itemId: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

/**
 * @component QuantityControl
 * @description A reusable control for incrementing and decrementing an item's quantity.
 * It is designed to be a controlled component, receiving its state (`quantity`) via props
 * and reporting changes through the `onUpdateQuantity` callback. This makes it stateless
 * and easy to integrate into various parts of the application.
 */
export const QuantityControl: React.FC<QuantityControlProps> = ({
  itemId,
  quantity,
  onUpdateQuantity,
}) => {
  // Inline styles are used here for simplicity as this is a highly specific,
  // non-reusable style. For a more extensive design system, this would be
  // moved to a dedicated CSS module or styled-component.
  const quantityStyle: React.CSSProperties = {
    width: 40,
    textAlign: "center",
    borderTop: "1px solid #d9d9d9",
    borderBottom: "1px solid #d9d9d9",
    padding: "4px 0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "24px",
  };

  return (
    <Space.Compact style={{ marginTop: "8px" }}>
      <Button
        size="small"
        icon={<MinusOutlined />}
        onClick={() => onUpdateQuantity(itemId, quantity - 1)}
        // The button is disabled when the quantity is at its minimum,
        // preventing invalid states (e.g., zero or negative quantity).
        disabled={quantity <= 1}
      />
      <div style={quantityStyle}>
        <Text>{quantity}</Text>
      </div>
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => onUpdateQuantity(itemId, quantity + 1)}
      />
    </Space.Compact>
  );
};
