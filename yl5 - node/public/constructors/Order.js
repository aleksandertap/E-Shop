import { cartConstructor } from "./Cart.js";
export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }
  printOrder() {
    const cartContainer = document.getElementById("mainDiv");
    const orderContainer = document.createElement("div");
    orderContainer.className = "order-container";
    orderContainer.innerHTML = `Tellimuse kuupäev: ${this.orderDate.toLocaleString()}`;

    this.cart.products.forEach((item) => {
      const cartElement = document.createElement("p");
      cartElement.innerHTML = `Toode: ${item.product.name}, Kogus: ${
        item.quantity
      }, Hind kokku: ${item.product.price * item.quantity}.`;
      orderContainer.append(cartElement);
    });
    const sumElement = document.createElement("h4");
    sumElement.innerHTML = `Kogusumma: $${this.cart.calculateTotal()}`;

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Sulge tellimuse vaade";
    closeButton.onclick = () => {
      orderContainer.className = "order-container-close";
      
      cartConstructor.clear();
      cartConstructor.displayTotalItems()
    };
    orderContainer.append(sumElement, closeButton);
    cartContainer.append(orderContainer);
  }
}
