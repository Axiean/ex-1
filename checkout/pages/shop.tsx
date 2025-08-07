import productsPage from "products/products";

console.log("SARE SCOP{E", __webpack_share_scopes__);
const products = productsPage;
products.getInitialProps = productsPage.getInitialProps;
export default products;
