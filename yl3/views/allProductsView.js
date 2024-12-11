// kõikide toodete vaade
import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/Cart.js";
import { costumerConstructor } from "../constructors/Customer.js";

export function displayProducts(products) {
  const mainDiv = document.getElementById("mainDiv");
  mainDiv.innerHTML = "<h2>Tooted</h2>";

  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `<h3>${product.name}</h3>
                                <p>Kategooria: ${product.category}</p>
                                <p>Hind $${product.price}</p>`;

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";
    cartButton.onclick = (e) => {
      e.stopPropagation();
      cartConstructor.addProduct(product);
    };

    productCard.append(cartButton);

    const faveButton = document.createElement("button");
    faveButton.textContent = "Lisa lemmikutesse";
    faveButton.onclick = (e) => {
      e.stopPropagation();
      costumerConstructor.toggleFavorites(product);
    };

    productCard.append(faveButton);

    productCard.onclick = (e) => {
      e.stopPropagation();
      navigate("productDetail", product);
    };
    productContainer.append(productCard);
  });
  mainDiv.append(productContainer);
}
