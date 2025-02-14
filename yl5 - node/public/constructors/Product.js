export class Product {
  constructor(id, name, price, category, description, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
  }
  describe() {
    return `This is a ${this.name}. It costs $${this.price}. It is a ${this.category}`;
  }
  static discountedPrice(price, discount) {
    return price - (price * discount) / 100;
  }
}
