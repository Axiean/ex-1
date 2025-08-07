import { Suspense, lazy } from "react";
import App, { AppProps } from "next/app";

const Nav = lazy(() => {
  console.log(import("home/nav"));
  return import("home/nav");
});

function MyApp({ Component, pageProps }: AppProps) {
  console.log("in app");
  return (
    <>
      <Suspense fallback={"loading"}>
        <Nav />
      </Suspense>
      <Component {...pageProps} />
      <div className="test">test</div>
    </>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  console.log("in app getInitialProps");
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
