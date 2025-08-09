import { CartItem } from "@/library/types";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, InputNumber, List, Space, Typography } from "antd";
import React from "react";

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
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar shape="square" size={80} src={item.image} />}
        title={<Text strong>{item.title}</Text>}
        description={
          <Space.Compact style={{ marginTop: "8px" }}>
            <Button
              icon={<MinusOutlined />}
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            />
            <InputNumber
              min={1}
              value={item.quantity}
              onChange={(value) => onUpdateQuantity(item.id, value || 1)}
              style={{ width: 50, textAlign: "center" }}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            />
          </Space.Compact>
        }
      />
      <Space direction="vertical" align="end">
        <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </Button>
      </Space>
    </List.Item>
  );
};
