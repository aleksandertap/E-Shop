import { costumerConstructor } from "../constructors/Customer.js";
import { cartConstructor } from "../constructors/Cart.js";
export function favoritesView() {
  const favorites = costumerConstructor.getAllFavorites();

  const container = document.getElementById("mainDiv");
  container.innerHTML = "<h2>Lemmikud</h2>";

  favorites.forEach((item) => {
    const faveItems = document.createElement("div");
    faveItems.classList.add("faveItem");
    faveItems.innerHTML = `Nimi: ${item.product.name}.
                               Hind: $${item.product.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eemalda lemmikust";
    removeBtn.onclick = () => {
      costumerConstructor.toggleFavorites(item.product);
      favoritesView();
    };

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";
    cartButton.onclick = (e) => {
      e.stopPropagation();
      cartConstructor.addProduct(item.product);
    };

    faveItems.append(cartButton);
    faveItems.append(removeBtn);

    container.append(faveItems);
  });
}
