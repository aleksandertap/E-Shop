export class Customer {
    constructor(name) {
      this.name = name;
      this.orderHistory = [];
    }
    placeOrder(cart) {
      let newOrder = new Order(cart);
      this.orderHistory.push(newOrder);
    }
    printOrderHistory() {
      this.orderHistory.forEach((item, index) =>
        console.log(
          `${
            index + 1
          }. Tellimuse kuupäev: ${item.orderDate.toLocaleString()}. Tellimuse kogusumma: €${item.cart.calculateTotal()}`
        )
      );
    }
  }