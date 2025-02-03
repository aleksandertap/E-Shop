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
    orderContainer.innerHTML = `Order date: ${this.orderDate.toLocaleString()}`;

    this.cart.products.forEach((item) => {
      const cartElement = document.createElement("p");
      cartElement.innerHTML = `Product name: ${item.product.name}, Quantity: ${
        item.quantity
      }, Total price : ${item.product.price * item.quantity}.`;
      orderContainer.append(cartElement);
    });
    const sumElement = document.createElement("h4");
    sumElement.innerHTML = `Total price: $${this.cart.calculateTotal()}`;

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Close order view";
    closeButton.onclick = () => {
      orderContainer.className = "order-container-close";
      
      cartConstructor.clear();
      cartConstructor.displayTotalItems()
    };
    orderContainer.append(sumElement, closeButton);
    cartContainer.append(orderContainer);
  }
}
