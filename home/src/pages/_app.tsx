import { Nav } from "@library/components";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { store } from "../store/store";
import "../styles/global.scss";

const AppNav = () => {
  const basketItems = useAppSelector((state) => state.basket.items);
  const totalItems = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <Nav basketItemCount={totalItems} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <AppNav />
        <Component {...pageProps} />
      </Provider>
    </AntdRegistry>
  );
}

export default MyApp;
