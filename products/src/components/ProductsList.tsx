// products/components/ProductList.tsx
import React from "react";
import Link from "next/link";
import { Product } from "../../../home/src/store/productsApi";
import { Button } from "home/ui-library";

export interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      <div className="products-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <Button onClick={() => alert(`Added ${product.title} to cart!`)}>
              Add to Cart
            </Button>
            {/* <Link href={`/p/${product.id}`}>View Details</Link> */}
          </div>
        ))}
      </div>
      <style jsx>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 1rem;
          text-align: center;
        }
        .product-card img {
          max-width: 100%;
          height: 200px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default ProductList;
