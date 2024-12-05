import { displayProductDetailView } from "./views/productDetailView.js";
import { favoritesView } from "./views/favoritesView.js";
import { displayCartView } from "./views/cartView.js";
import { displayProducts } from "./views/allProductsView.js";

export function navigate(view, param){
    const views = {
        allProducts: () => displayProducts(view || "all"),
        productDetail: () => displayProductDetailView(param),
        cart: () => displayCartView(),
        favorites: () => favoritesView()
    }


if(views[view]){
    views[view]()

    const encodedParam = encodeURIComponent(param)
    const newUrl =
        view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`
    window.history.pushState({}, "", newUrl)
    }
}

window.addEventListener("popstate", () => {
    const path = window.location.pathname
    const [_, view, param] = path.split("/")
    const decodedParam = decodeURIComponent(param)
    navigate(view || "category", decodedParam)
})