import React from "react";
import { List, Space, Button, Typography, Avatar } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { CartItem } from "@library/types";

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
  // Style for the quantity display box
  const quantityStyle: React.CSSProperties = {
    width: 50,
    textAlign: "center",
    borderTop: "1px solid #d9d9d9",
    borderBottom: "1px solid #d9d9d9",
    padding: "4px 0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px", // Match default Ant Design button height
  };

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
            <div style={quantityStyle}>
              <Text>{item.quantity}</Text>
            </div>
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
