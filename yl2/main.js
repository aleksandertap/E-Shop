// main.js

import { Product } from './constructors/Product.js';

import { Cart } from './constructors/Cart.js';

import { Customer } from './constructors/Customer.js';

import { displayProducts } from './views/allProductsView.js';


// Loo mõned tooted

const products =[
new Product(1, 'Sülearvuti', 999.99, 'Elektroonika'),
new Product(2, 'Telefon', 499.99, 'Elektroonika'),
new Product(3, 'Tahvelarvuti', 299.99, 'Elektroonika')
]
// Loo ostukorv ja lisa tooted

const cart = new Cart();

// cart.addProduct(laptop, 1);

// cart.addProduct(phone, 2);

// Kuvage ostukorvi summa ja toodete arv

console.log("Kogusumma:", cart.calculateTotal());

console.log("Kokku tooteid ostukorvis:", cart.totalItems);

// Loo klient ja esita tellimus

const customer = new Customer('Alice');

customer.placeOrder(cart);

// Kuvage tellimuste ajalugu

customer.printOrderHistory();


document.title = 'My WebShop';
const heading1 = document.getElementById("heading1")

heading1.style.backgroundColor = "aqua";
heading1.style.textAlign = "center";
heading1.style.color = "orange"
console.log(heading1)

displayProducts(products)