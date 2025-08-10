import React from "react";
import { List, Space, Button, Typography, Avatar } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { CartItem } from "@library/types";

const { Text } = Typography;

interface BasketItemProps {
  item: CartItem;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const BasketItem: React.FC<BasketItemProps> = ({
  item,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  return (
    <List.Item
      actions={[
        <Space
          direction="vertical"
          align="end"
          style={{ width: "100px", gap: "2rem" }}
        >
          <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
          <Button
            style={{ padding: 0 }}
            type="link"
            danger
            onClick={() => onRemoveItem(item.id)}
          >
            Remove
          </Button>
        </Space>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            size={100}
            src={item.image}
            style={{ objectFit: "contain" }}
          />
        }
        title={
          <Space direction="vertical" size={4}>
            <Text strong>{item.title}</Text>
            <QuantityControl
              itemId={item.id}
              quantity={item.quantity}
              onUpdateQuantity={onUpdateQuantity}
            />
          </Space>
        }
      />
    </List.Item>
  );
};

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
