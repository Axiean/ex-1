import App, { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Nav } from "./../../../ui-library/src";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
