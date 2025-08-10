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

      <div>
        <h1>Products Page</h1>
        <h3 className="title">
          This is a federated page owned by localhost:3002
        </h3>
      </div>
    </div>
  );
};

export default Products;
