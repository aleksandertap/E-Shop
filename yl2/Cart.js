export class Cart {
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
  