// 1

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



// 2

class Cart{
    constructor(){
        this.products = []
    }
    addProduct(product, quantity){
        this.products.push({product, quantity})
    }
    removeProduct(productName) {
        this.products = this.products.filter(item => item.product.name !== productName);
    }
    calculateTotal(){
        return this.products.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }
    
    get totalItems(){
        return this.products.reduce((total, item) => total + item.quantity,0)
    }
    
}



// 3
class Order{
    constructor(cart){
        this.orderDate = new Date()
        this.cart = cart
    }
    printOrder(){
        console.log(`Tellimuse kuupäev: ${this.orderDate.toLocaleString()}`)
        console.log("Tellimuse sisu:")
        this.cart.products.forEach(item => {
            console.log(`Toode: ${item.product.name}, Kogus: ${item.quantity}, Hind kokku: ${item.product.price * item.quantity}`)
        });
        console.log(`Tellimuse kogusumma : €${this.cart.calculateTotal()}`)
    }
}

//4
class Customer{
    constructor(name){
        this.name = name,
        this.orderHistory = []
    }
    placeOrder(cart){
        let newOrder = new Order(cart)
        this.orderHistory.push(newOrder)
    }
    printOrderHistory(){
        this.orderHistory.forEach(item =>
            console.log(`Tellimuse kuupäev: ${item.orderDate.toLocaleString()}. Tellimuse kogusumma: €${item.cart.calculateTotal()}`)
        )
    }
}

let laptop = new Product("sülearvuti", 800.50, "elektroonika")
console.log(laptop.describe())
console.log("Soodustesega on uus hind: " + Product.discountedPrice(laptop.price, 10))

const laptop2 = { name: "Laptop", price: 1000 };
const phone = { name: "Phone", price: 500 };

const cart = new Cart();

cart.addProduct(laptop2, 2); // Lisa 2 sülearvutit
cart.addProduct(phone, 1); // Lisa 1 telefon

console.log(cart.calculateTotal()); // Kokku hind: 2500
console.log(cart.totalItems); // Kokku tooteid: 3
cart.removeProduct("Laptop"); // Eemalda sülearvutid ostukorvist
console.log(cart.calculateTotal()); // Kokku hind: 500
console.log(cart.totalItems); // Kokku tooteid: 1

const order = new Order(cart);

order.printOrder()

const customer = new Customer('Alice');

customer.placeOrder(cart);

customer.printOrderHistory();