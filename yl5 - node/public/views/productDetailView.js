import { cartConstructor } from "../constructors/Cart.js";
import { costumerConstructor } from "../constructors/Customer.js";
export function displayProductDetailView(product) {
  const container = document.getElementById("mainDiv");
  container.innerHTML = "";

  const productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = `<h2>${product.name}</h2>
                            <img src= "${product.image}">
                            <p>${product.description}</p>
                             <p>Category : ${product.category}</p>
                             <p>Price : $${product.price}</p>
                             <p>ID : ${product.id} </p>
                             `;
  const cartButton = document.createElement("button");
  cartButton.textContent = "Add to cart";
  cartButton.onclick = (e) => {
    e.stopPropagation();
    cartConstructor.addProduct(product);
  };
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
  productCard.append(cartButton);
  productCard.append(faveButton);

  container.append(productCard);
}
