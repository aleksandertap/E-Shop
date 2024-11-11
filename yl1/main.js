class Product{
    constructor(title, price, category){
        this.title = title,
        this.price = price,
        this.category = category
    }
    describe(){
        return `This is a ${this.title}. It costs $${this.price}. It is a ${this.category}`
    }
    static discountedPrice(price, discount){
        return price - (price * discount / 100)
    }
}

let laptop = new Product("sülearvuti", 800.50, "elektronika")
console.log(laptop.describe())
console.log(Product.discountedPrice(laptop.price, 10))

// siin on test