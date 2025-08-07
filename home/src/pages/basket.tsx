import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// Dynamically import the Basket component and disable SSR
const BasketComponent = dynamic(() => import("basket/Basket"), {
  ssr: false,
});

const BasketPage: NextPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Basket</h1>
      <Suspense fallback={<p>Loading basket...</p>}>
        <BasketComponent />
      </Suspense>
    </div>
  );
};

export default BasketPage;
