import { Product } from "@library/types";
import { message, Space, Spin, Typography } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { addToBasket } from "../store/basketSlice";
import { useAppDispatch } from "../store/hooks";
import { useGetProductsQuery } from "../store/productsApi";
import { withErrorBoundary } from "@library/hocs";

const { Title, Paragraph } = Typography;

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

/**
 * The ProductList component is imported dynamically from the 'products' remote application.
 * This is a core principle of the micro-frontend architecture, allowing the product listing
 * feature to be developed, deployed, and scaled independently from the host application.
 * - `ssr: false` is specified because this component has client-side dependencies and
 * interactivity that are not required for the initial server-rendered HTML.
 * - `loading` provides a fallback UI, improving the user experience by showing a spinner
 * while the remote component's chunk is being fetched and loaded.
 */
const ProductList = dynamic<ProductListProps>(
  () => import("products/ProductList"),
  {
    ssr: false,
    loading: () => <Spin fullscreen />,
  }
);

// The dynamically imported ProductList is wrapped in an Error Boundary HOC.
// This ensures that if the remote component fails to load or encounters a runtime error,
// it won't crash the entire host application. Instead, a graceful fallback UI will be rendered.
const SafeProductList = withErrorBoundary(ProductList);

const Home: NextPage = () => {
  // RTK Query hook for fetching product data. It handles caching, loading, and error states automatically.
  const { data: products, error } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  // Callback function passed to the ProductList component.
  // This follows the "pass callbacks down" pattern, keeping the child component stateless
  // and allowing the host to control application-specific logic like state updates and user feedback.
  const handleAddToCart = (product: Product) => {
    dispatch(addToBasket(product));
    // Provide immediate user feedback upon action completion.
    message.success(`${product.title} added to basket!`);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Space direction="vertical">
          <Title level={5}>Products</Title>
          <Paragraph
            type="secondary"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ad
            harum cupiditate magnam veritatis perferendis aperiam saepe quia
            totam deserunt amet neque, eligendi autem vitae nemo quibusdam culpa
            architecto facere.
          </Paragraph>
        </Space>

        {/* Render the SafeProductList only when the products data is available. */}
        {products && (
          <SafeProductList products={products} onAddToCart={handleAddToCart} />
        )}
      </div>
    </>
  );
};

export default Home;
