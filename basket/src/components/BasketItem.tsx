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

/**
 * @component BasketItem
 * @description Renders a single item within the basket list. It encapsulates the
 * layout and user actions for an individual product, such as quantity adjustment
 * and removal, delegating these actions to the parent component via callbacks.
 */
export const BasketItem: React.FC<BasketItemProps> = ({
  item,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  return (
    <List.Item
      // The `actions` prop provides a dedicated space for interactive elements,
      // ensuring a consistent layout across all list items.
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
