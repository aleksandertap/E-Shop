// main.js

import { Cart } from "./constructors/Cart.js";
import { Customer } from "./constructors/Customer.js";
import { favoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";

import { Product } from "./constructors/Product.js";
import { navigate } from "./router.js";
import { displayProducts } from "./views/allProductsView.js";
import { getProductsDataFromJson } from "./api.js";
// Loo mõned tooted

// const products = [
//   new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
//   new Product(2, "Telefon", 499.99, "Elektroonika"),
//   new Product(3, "Tahvelarvuti", 299.99, "Elektroonika"),
// ];

document.title = "My WebShop";

const initApp = async () => {

  const homeButton = document.getElementById("homeBtn");
  homeButton.onclick = () => initApp();

  const productsData = await getProductsDataFromJson()
  const products = productsData.map(item => new Product (item.id, item.name, item.price, item.category))



  const faveButton = document.getElementById("favoritesBtn");
  faveButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cartBtn");
  cartButton.onclick = () => navigate("cart");

  displayProducts(products);
  
};

document.addEventListener("DOMContentLoaded", initApp);
