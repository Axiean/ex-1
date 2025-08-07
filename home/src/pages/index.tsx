import React, { Fragment, Suspense, lazy } from "react";
import Head from "next/head";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Product, useGetProductsQuery } from "../store/productsApi";

interface ProductListProps {
  products: Product[];
}

const Basket = dynamic(() => import("basket/Basket"), {
  ssr: false,
  loading: () => <p>Loading Basket...</p>,
});

const Products = dynamic(() => import("products/products"), {
  ssr: false,
  loading: () => <p>Loading Products...</p>,
});

const ProductList = dynamic<ProductListProps>(
  () => import("products/ProductList"),
  {
    ssr: false,
    loading: () => <p>Loading Products...</p>,
  }
);

const Home: NextPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/nextjs-ssr/home/public/favicon.ico" />
      </Head>

      <div style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center" }}>Featured Products</h2>
        {isLoading && <p>Loading Products...</p>}
        {error && <p>Error loading products.</p>}
        {products && <ProductList products={products} />}
      </div>

      <div style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center" }}>Featured Products</h2>
        <Products />
      </div>

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>My Basket</h2>
        <Basket />
      </div>

      <style jsx>{`
        .hero {
          background-color: #000;
          width: 100%;
          color: #333;
        }

        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }

        .title,
        .description {
          text-align: center;
        }

        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }

        .card:hover {
          border-color: #067df7;
        }

        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }

        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </>
  );
};

// Home.getInitialProps = async (ctx) => {
//   return {};
// };

export default Home;
