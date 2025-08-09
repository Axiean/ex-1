import { Nav } from "@/library/components";
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
    <Provider store={store}>
      <AppNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
