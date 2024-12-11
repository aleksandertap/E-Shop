export class Product {
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
