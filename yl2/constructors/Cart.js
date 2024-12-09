export class Cart {
    constructor() {
      this.products = [];
    }
    getAllProducts(){
      return this.products
    }

    addProduct(product, quantity = 1) {
      let existingProduct = this.products.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.products.push({ product, quantity });
      }
      this.displayTotalItems()
    }
   
    removeProduct(productId) {
      this.products = this.products.filter(
        (item) => item.product.id !== productId
      );
      this.displayTotalItems()
    }
    calculateTotal() {
      return this.products.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    }
  
    
    displayTotalItems(){
      const cartCount = document.getElementById("cartCount")
      cartCount.innerHTML = this.products.reduce(
        (total, item) => total + item.quantity,0)
    }
    clear(){
      this.products = []
    }

  }

export const cartConstructor = new Cart()
  