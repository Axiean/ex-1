import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage, GetServerSideProps } from "next";

const productLinks = [
  { href: "/p/1", label: "Product 1" },
  { href: "/p/2", label: "Product 2" },
  { href: "/p/3", label: "Product 3" },
].map((link) => {
  return link;
});

interface productsProps {
  test?: number;
}

const products: NextPage<productsProps> = (props) => (
  <div>
    <Head>
      <title>products</title>
      <link rel="icon" href="/nextjs-ssr/products/public/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>products Page</h1>
      <h3 className="title">
        This is a federated page owned by localhost:3002
      </h3>
      <ul>
        {productLinks.map(({ href, label }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 20px;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { test: 1234 } };
};

export default products;
