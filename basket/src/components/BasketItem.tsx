import React from "react";
import { List, Space, Button, Typography, Avatar } from "antd";
import type { CartItem } from "@library/types";
import { QuantityControl } from "./QuantityControl";

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
