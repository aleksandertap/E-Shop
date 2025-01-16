import { costumerConstructor } from "../constructors/Customer.js";
import { cartConstructor } from "../constructors/Cart.js";
export function favoritesView() {
  const favorites = costumerConstructor.getAllFavorites();

  const container = document.getElementById("mainDiv");
  container.innerHTML = "<h2>Lemmikud</h2>";

  favorites.forEach((item) => {
    const faveItems = document.createElement("div");
    faveItems.classList.add("faveItem");
    faveItems.innerHTML = `<img src= "${item.product.image}">
                            <p>Nimi: ${item.product.name}</p>.
                               <p>Hind: $${item.product.price}</p>`;

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")

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

    buttonContainer.append(cartButton,removeBtn);
    faveItems.append(buttonContainer)

    container.append(faveItems);
  });
}
