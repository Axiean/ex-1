import React from "react";
import { ProductCard } from "@library/components";
import { Product } from "@library/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onAddToWishlist,
}) => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "1rem",
  };

  return (
    <div style={gridStyle}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductList;
