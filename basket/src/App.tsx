// basket/src/App.tsx
import React from "react";
import {
  Card,
  Table,
  Avatar,
  Button,
  InputNumber,
  Typography,
  Divider,
  Row,
  Col,
  Input,
  Space,
  List,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

// --- Type Definitions ---
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
interface BasketProps {
  items?: Product[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
}
// ---

const { Title, Text } = Typography;

const App: React.FC<BasketProps> = ({
  items = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
}) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Space direction="horizontal" align="start">
              {/* Set fixed height and width for image */}
              <img
                src={item.image}
                style={{
                  height: 140,
                  // width: 60,
                  // objectFit: "fill",
                  borderRadius: 4,
                }}
                alt={item.title}
              />

              <Space direction="vertical" size={0} align="start">
                <Text strong>{item.title}</Text>
                <Text type="secondary">Quantity: {item.quantity}</Text>
              </Space>
            </Space>

            <Space direction="vertical" align="end">
              <Text>${item.price.toFixed(2)}</Text>

              <Button
                type="link"
                danger
                // icon={<DeleteOutlined />}
                // onClick={() => onRemove(item.id)}
              >
                Remove
              </Button>
            </Space>
          </List.Item>
        )}
      />

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Text strong>Subtotal</Text>
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

export default App;
