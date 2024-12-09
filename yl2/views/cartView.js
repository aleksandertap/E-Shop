import { cartConstructor } from "../constructors/Cart.js";

export function displayCartView() {
  const mainDiv = document.getElementById("mainDiv");
  mainDiv.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartConstructor.getAllProducts();

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
      
      
    const removeBtn = document.createElement("button");
      removeBtn.textContent = "Eemalda ostukorvist";
      removeBtn.onclick = () => {
        cartConstructor.removeProduct(product.product.id)
        displayCartView()
      }
      
      productCard.append(removeBtn);
      mainDiv.append(productCard);
    });
  }
}
