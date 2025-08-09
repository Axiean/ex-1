import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Nav } from "../../../library/src";
import "../styles/global.scss";
import { useAppSelector } from "../store/hooks";
import { store } from "../store/store";

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
    <Provider store={store}>
      <AppNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
