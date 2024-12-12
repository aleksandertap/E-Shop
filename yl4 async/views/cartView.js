import { cartConstructor } from "../constructors/Cart.js";
import { costumerConstructor } from "../constructors/Customer.js";

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

      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add("quantityContainer");

      const decBtn = document.createElement("button");
      decBtn.innerHTML = "-";
      decBtn.onclick = () => {
        cartConstructor.updateProductQuantity(product.product.id, -1);
        displayCartView();
      };

      const quantityNumber = document.createElement("input");
      quantityNumber.value = product.quantity;
      quantityNumber.onchange = () => {
        const newNumber = parseInt(quantityNumber.value);
        if (!isNaN(newNumber && newNumber > 0)) {
          cartConstructor.updateProductQuantity(
            product.product.id,
            newNumber - product.quantity
          );
          displayCartView();
        } else {
          quantityNumber.value = product.quantity;
        }
      };

      const ascBtn = document.createElement("button");
      ascBtn.innerHTML = "+";
      ascBtn.onclick = () => {
        cartConstructor.updateProductQuantity(product.product.id, 1);
        displayCartView();
      };

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Eemalda ostukorvist";
      removeBtn.onclick = () => {
        cartConstructor.removeProduct(product.product.id);
        displayCartView();
      };
      quantityContainer.appendChild(decBtn);
      quantityContainer.appendChild(quantityNumber);
      quantityContainer.appendChild(ascBtn);
      productCard.append(quantityContainer);
      productCard.append(removeBtn);
      mainDiv.append(productCard);
    });
  }
  if (!cart.length) {
    const totalCostCard = document.createElement("div");
    totalCostCard.style.display = "none";
  } else {
    const total = cartConstructor.calculateTotal();
    const kaibemaksuta = total - total * 0.22;
    const kaibemaks = total * 0.22
    const totalCostCard = document.createElement("div");
    totalCostCard.classList.add("totalCard");

    totalCostCard.innerHTML =
      "<h2>Kokkuvõte</h2><p>Koguhind:</p>$" +
      total.toFixed(2) +
      "<p>Käibemaksuta:</p>$" +
      kaibemaksuta.toFixed(2) + 
      "<p>Käibemaks:</p>$" +
      kaibemaks.toFixed(2)

    mainDiv.append(totalCostCard);
  }
  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cartSummary");

  const sumbitButton = document.createElement("button");
  sumbitButton.innerHTML = "Osta";
  sumbitButton.onclick = (e) => {
    e.stopPropagation();
    costumerConstructor.placeOrder(cart);
  };
  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Tühista ostukorv";
  cancelButton.onclick = () => {
    cartConstructor.clear();
    displayCartView();
    cartConstructor.displayTotalItems();
  };
  cartSummary.append(sumbitButton, cancelButton);
  mainDiv.append(cartSummary);
}
