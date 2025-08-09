import React from "react";
import Head from "next/head";
import { NextPage } from "next";

const Products: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <h1>Products Page</h1>
        <h3 className="title">
          This is a federated page owned by localhost:3002
        </h3>
      </div>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
          padding: 2rem;
        }
        .title {
          text-align: center;
        }
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
    </div>
  );
};

export default Products;
