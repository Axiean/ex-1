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

const AppNav = () => {
  const basketItems = useAppSelector((state) => state.basket.items);
  const totalItems = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <Nav basketItemCount={totalItems} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AntdRegistry>
      <Provider store={store}>
        <PersistGate loading={<Spin fullscreen />} persistor={persistor}>
          <AppNav />
          <main style={{ padding: isMobile ? "1rem" : "2rem" }}>
            <Component {...pageProps} />
          </main>
        </PersistGate>
      </Provider>
    </AntdRegistry>
  );
}

export default MyApp;
