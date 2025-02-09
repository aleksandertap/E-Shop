// main.js

import { costumerConstructor, Customer } from "./constructors/Customer.js";
import { navigate } from "./router.js";
import { displayProducts } from "./views/allProductsView.js";
import { getAllCategory } from "./api.js";


document.title = "My WebShop";

const initApp = async () => {

  const homeButton = document.getElementById("homeBtn");
  homeButton.onclick = () => displayProducts(categories[0])

  const categories = await getAllCategory()
  const categoryMenu = document.getElementById("categories")
  categories.forEach((category) => {
    const categoryElement = document.createElement("button")
    categoryElement.innerHTML = category
    categoryElement.onclick = () => 
      displayProducts(category)
    categoryMenu.appendChild(categoryElement)
  })



  const faveButton = document.getElementById("favoritesBtn");
  faveButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cartBtn");
  cartButton.onclick = () => navigate("cart");

  await costumerConstructor.getAllFavorites()
  displayProducts(categories[0]);
  
};

document.addEventListener("DOMContentLoaded", initApp);
