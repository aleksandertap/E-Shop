// kõikide toodete vaade
import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/Cart.js";
import { costumerConstructor } from "../constructors/Customer.js";
import { getProductsDataByCategory } from "../api.js";

export const displayProducts = async (category) => {
  
  const products = await getProductsDataByCategory(category)
  const mainDiv = document.getElementById("mainDiv");
  mainDiv.innerHTML = "<h2>Products</h2>";

  const productsContainer = document.createElement("div")
  productsContainer.classList.add("products-container")

  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `<h3>${product.name}</h3>
                                <img src= "${product.image}">
                                <p>Category: ${product.category}</p>
                                <p>Price: $${product.price}</p>
                                <p>${product.description}</p>`;

    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to cart";
    cartButton.onclick = (e) => {
      e.stopPropagation();
      cartConstructor.addProduct(product);
    };

    productCard.append(cartButton);

    const faveButton = document.createElement("button");
    faveButton.textContent = costumerConstructor.isFavorite(product)
      ? "Remove from favorites"
      : "Add to favorites";

    faveButton.onclick = async (e) => {
      e.stopPropagation();

      const isFavorite = await costumerConstructor.toggleFavorites(product);

      faveButton.textContent = isFavorite
        ? "Remove from favorites"
        : "Add to favorites";
    };

    productCard.append(faveButton);

    productCard.onclick = (e) => {
      e.stopPropagation();
      navigate("productDetail", product);
    };
    productContainer.append(productCard);
    productsContainer.append(productCard)
  });
  mainDiv.append(productsContainer);
}
