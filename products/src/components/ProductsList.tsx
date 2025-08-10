import React from "react";
import { ProductCard } from "@library/components";
import { Product } from "@library/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

/**
 * @component ProductList
 * @description A presentational component responsible for rendering a grid of products.
 * It receives an array of products and callback functions for user actions, making it
 * decoupled from the application's business logic and state management.
 */
const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onAddToWishlist,
}) => {
  // The grid layout is defined using CSS Grid for a responsive, clean structure.
  // `repeat(auto-fill, minmax(300px, 1fr))` creates a flexible grid that automatically
  // adjusts the number of columns based on the available container width.
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "1rem",
  };

  return (
    <div style={gridStyle}>
      {/* Map over the products array to render a ProductCard for each item. */}
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
