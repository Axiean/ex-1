import React from "react";
import { ProductCard, ProductCardProps } from "home/library";
import { Product } from "../../../home/src/store/productsApi";
import styles from "./ProductList.module.scss";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <>
      <div className={styles.productsGrid}>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
