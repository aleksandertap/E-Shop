import { displayProductDetailView } from "./views/productDetailView.js";
import { favoritesView } from "./views/favoritesView.js";
import { displayCartView } from "./views/cartView.js";
import { displayProducts } from "./views/allProductsView.js";

export function navigate(view, param) {
  const views = {
    allProducts: () => displayProducts(view || "all"),
    productDetail: () => displayProductDetailView(param),
    cart: () => displayCartView(),
    favorites: () => favoritesView(),
  };

  if (views[view]) {
    views[view]();
  }
}

