import productsPage from "products/products";

/**
 * @summary Re-exports the entire 'products' page from the remote application.
 * @description This file demonstrates a "page stitching" approach to micro-frontends.
 * The host application's routing (`/products`) is configured to serve a page that is
 * entirely owned, rendered, and managed by the 'products' remote.
 *
 * This pattern is powerful for features that are fully self-contained, allowing
 * teams to have complete autonomy over a specific route.
 *
 * The `getInitialProps` function is also re-assigned to ensure that any server-side
 * data fetching logic defined in the remote page is executed correctly by Next.js
 * when a user navigates to this route on the server.
 */
const products = productsPage;
products.getInitialProps = productsPage.getInitialProps;

export default products;
