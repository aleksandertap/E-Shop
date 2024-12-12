import { cartConstructor } from "../constructors/Cart.js";
import { costumerConstructor } from "../constructors/Customer.js";
export function displayProductDetailView(product) {
  const container = document.getElementById("mainDiv");
  container.innerHTML = "";

  const productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = `<h2>${product.name}</h2>
                             <p>Kategooria : ${product.category}</p>
                             <p>Hind : $${product.price}</p>
                             <p>ID : ${product.id} </p>
                             `;
  const cartButton = document.createElement("button");
  cartButton.textContent = "Lisa ostukorvi";
  cartButton.onclick = (e) => {
    e.stopPropagation();
    cartConstructor.addProduct(product);
  };
  const faveButton = document.createElement("button");
  faveButton.textContent = costumerConstructor.isFavorite(product)
    ? "Eemalda lemmikutest"
    : "Lisa lemmikutesse";

  faveButton.onclick = (e) => {
    e.stopPropagation();

    const isFavorite = costumerConstructor.toggleFavorites(product);

    faveButton.textContent = isFavorite
      ? "Eemalda lemmikutest"
      : "Lisa lemmikutesse";
  };
  productCard.append(cartButton);
  productCard.append(faveButton);

  container.append(productCard);
}
