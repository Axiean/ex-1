import React from "react";
import { Card, Typography, Button, Tag, Rate, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}
// ---

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist = () => {},
}) => {
  // 2. Truncate the description if it's too long
  const isDescriptionLong = product.description.length > 55;
  const truncatedDescription = isDescriptionLong
    ? `${product.description.substring(0, 55)}...`
    : product.description;

  const descriptionContent = (
    <Paragraph
      type="secondary"
      style={{
        marginBottom: 8,
        minHeight: "40px",
      }}
    >
      {truncatedDescription}
    </Paragraph>
  );

  return (
    <Card
      variant="outlined"
      style={{ position: "relative" }}
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{ height: 280, objectFit: "contain", padding: "1rem" }}
        />
      }
      actions={[
        <Button
          type="default"
          icon={<ShoppingCartOutlined />}
          key="add-to-cart"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>,
        <Button
          icon={<HeartOutlined />}
          shape="circle"
          key="wishlist"
          onClick={() => onAddToWishlist(product)}
        />,
      ]}
    >
      <Tag color="red" style={{ position: "absolute", top: 16, left: 16 }}>
        New
      </Tag>

      <Text type="secondary" style={{ textTransform: "uppercase" }}>
        {product.category}
      </Text>

      <Title level={5} style={{ marginTop: 8, height: 44, overflow: "hidden" }}>
        {product.title}
      </Title>

      {isDescriptionLong ? (
        <Tooltip title={product.description}>{descriptionContent}</Tooltip>
      ) : (
        descriptionContent
      )}

      {product.rating && (
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
          <Rate disabled allowHalf value={product.rating.rate} />
          <Text type="secondary" style={{ marginLeft: 8 }}>
            ({product.rating.count})
          </Text>
        </div>
      )}

      <Title level={3}>${product.price.toFixed(2)}</Title>
    </Card>
  );
};
