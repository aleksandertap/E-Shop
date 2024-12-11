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
    const kaibemaks = total * 1.22;
    const totalCostCard = document.createElement("div");
    totalCostCard.classList.add("totalCard");

    totalCostCard.innerHTML =
      "<h2>Toodete koguhind</h2><br>$" +
      total.toFixed(2) +
      "<br>Käibemaksuga<br>$" +
      kaibemaks.toFixed(2);
    mainDiv.append(totalCostCard);
  }
}
