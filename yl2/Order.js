
export class Order {
    constructor(cart) {
      this.orderDate = new Date();
      this.cart = cart;
    }
    printOrder() {
      console.log(`Tellimuse kuupäev: ${this.orderDate.toLocaleString()}`);
      console.log("Tellimuse sisu:");
      this.cart.products.forEach((item) => {
        console.log(
          `Toode: ${item.product.name}, Kogus: ${item.quantity}, Hind kokku: ${
            item.product.price * item.quantity
          }`
        );
      });
      console.log(`Tellimuse kogusumma : €${this.cart.calculateTotal()}`);
    }
  }