import { Nav } from "@library/components";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { persistor, store } from "../store/store";
import "../styles/global.scss";
import { useMediaQuery } from "@library/hooks/useMediaQuery";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";
import { ReduxProviders } from "../providers/ReduxProviders";

/**
 * @component AppNav
 * @description A container component that connects the shared `Nav` component to the Redux store.
 * It is responsible for calculating the total number of items in the basket and passing it
 * as a prop to the presentational `Nav` component. This separation of concerns keeps the
 * UI component decoupled from the application's state.
 */
const AppNav = () => {
  const basketItems = useAppSelector((state) => state.basket.items);
  // A simple reducer to compute the total quantity, which is more efficient than
  // mapping and then reducing, especially for larger baskets.
  const totalItems = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <Nav basketItemCount={totalItems} />;
};

/**
 * @component MyApp
 * @description The custom App component for the Next.js application. It serves as the
 * entry point for all pages and is used to wrap them with global providers and layouts.
 *
 * Key responsibilities include:
 * - Setting up the Ant Design CSS-in-JS registry for server-side rendering.
 * - Providing the Redux store to the entire component tree.
 * - Integrating Redux Persist to rehydrate the store on the client side.
 * - Applying a consistent navigation bar and main layout to all pages.
 */
function MyApp({ Component, pageProps }: AppProps) {
  // useMediaQuery determines the viewport size to apply responsive padding.
  // This hook is SSR-safe, defaulting to a non-mobile value on the server
  // and re-evaluating on the client.
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    // AntdRegistry is essential for ensuring Ant Design's styles are correctly
    // extracted and injected during server-side rendering.
    <AntdRegistry>
      <ReduxProviders>
        <AppNav />
        <main style={{ padding: isMobile ? "1rem" : "2rem" }}>
          <Component {...pageProps} />
        </main>
      </ReduxProviders>
    </AntdRegistry>
  );
}

export default MyApp;
