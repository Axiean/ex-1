import React from "react";
import { List, Space, Button, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface QuantityControlProps {
  itemId: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  itemId,
  quantity,
  onUpdateQuantity,
}) => {
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
