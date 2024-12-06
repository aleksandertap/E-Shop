import { cartContructor } from "../constructors/Cart.js";
import { Product } from "../constructors/Product.js";

export function displayCartView() {
  const mainDiv = document.getElementById("mainDiv");
  mainDiv.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartContructor.getAllProducts();

  if (!cart.length) {
    const productCard = document.createElement("p");
    productCard.innerText = "Ostukorv on tühi";
    mainDiv.append(productCard);
  } else {
    cart.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("cartItem");
      productCard.innerHTML = `<h3>${product.product.name}</h3>
                                <p>Hind $${product.product.price}</p>
                                <p>Kogus: ${product.quantity}</p>`;
      mainDiv.append(productCard);
    });
  }
}
