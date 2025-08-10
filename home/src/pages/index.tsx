import { Product } from "@library/types";
import { message, Space, Spin, Typography } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { addToBasket } from "../store/basketSlice";
import { useAppDispatch } from "../store/hooks";
import { useGetProductsQuery } from "../store/productsApi";
import { useMediaQuery } from "@library/hooks/useMediaQuery";
import { withErrorBoundary } from "@library/hocs";

const { Title, Paragraph } = Typography;

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList = dynamic<ProductListProps>(
  () => import("products/ProductList"),
  {
    ssr: false,
    loading: () => <Spin fullscreen />,
  }
);

const SafeProductList = withErrorBoundary(ProductList);

const Home: NextPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToBasket(product));
    message.success(`${product.title} added to basket!`);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/nextjs-ssr/home/public/favicon.ico" />
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

        {products && (
          <SafeProductList products={products} onAddToCart={handleAddToCart} />
        )}
      </div>
    </>
  );
};

export default Home;
