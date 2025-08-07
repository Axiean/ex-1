import { Suspense, lazy } from "react";
import App, { AppProps } from "next/app";
import { Provider } from "react-redux";

const Nav = lazy(() => import("home/nav"));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Suspense fallback={"loading"}>
        <Nav />
      </Suspense>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
