import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 100 )
    this.orderHistory = [];
    this.favorties = [];
  }
  placeOrder(cart) {
    let newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
    newOrder.printOrder()
    
  }
  printOrderHistory() {
    this.orderHistory.forEach((item, index) =>
      console.log(
        `${
          index + 1
        }. Tellimuse kuupäev: ${newOrder.orderDate.toLocaleString()}. Tellimuse kogusumma: €${newOrder.cart.calculateTotal()}`
      )
    );
  }
  toggleFavorites(product) {
    const existingProduct = this.favorties.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      this.favorties = this.favorties.filter(
        (item) => item.product.id !== product.id
      );
      return false;
    } else {
      this.favorties.push({ product });
      return true;
    }
  }
  
  
  isFavorite(product) {
    return this.favorties.some((item) => item.product.id === product.id);
  }
  getAllFavorites() {
    return this.favorties;
  }
}

export const costumerConstructor = new Customer("Aleksander");
