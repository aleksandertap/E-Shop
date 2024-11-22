// 1

class Product {
  constructor(id, name, price, category) {
    (this.id = id),
      (this.name = name),
      (this.price = price),
      (this.category = category);
  }
  describe() {
    return `This is a ${this.name}. It costs $${this.price}. It is a ${this.category}`;
  }
  static discountedPrice(price, discount) {
    return price - (price * discount) / 100;
  }
}

// 2

class Cart {
  constructor() {
    this.products = [];
  }
  addProduct(product, quantity) {
    let existingProduct = this.products.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.products.push({ product, quantity });
    }
  }
  removeProduct(productId) {
    this.products = this.products.filter(
      (item) => item.product.id !== productId
    );
  }
  calculateTotal() {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this.products.reduce((total, item) => total + item.quantity, 0);
  }
}

// 3
class Order {
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

//4
class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }
  placeOrder(cart) {
    let newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
  }
  printOrderHistory() {
    this.orderHistory.forEach((item) =>
      console.log(
        `Tellimuse kuupäev: ${item.orderDate.toLocaleString()}. Tellimuse kogusumma: €${item.cart.calculateTotal()}`
      )
    );
  }
}

let laptop = new Product(1, "Laptop", 1000, "Electronics");
let phone = new Product(2, "Phone", 500, "Electronics");
console.log(laptop.describe());
console.log(
  "Soodustesega on uus hind: " + Product.discountedPrice(laptop.price, 10)
);

const cart = new Cart();

cart.addProduct(laptop, 2);
cart.addProduct(phone, 1);

console.log(cart.calculateTotal());
console.log(cart.totalItems);
cart.removeProduct(1);
console.log(cart.calculateTotal());
console.log(cart.totalItems);

const order = new Order(cart);

order.printOrder();

const customer = new Customer("Alice");

customer.placeOrder(cart);

customer.printOrderHistory();
