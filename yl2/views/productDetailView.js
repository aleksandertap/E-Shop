import { cartConstructor } from "../constructors/Cart.js"
export function displayProductDetailView(product){
    const container = document.getElementById("mainDiv")
    container.innerHTML = ""

    const productCard = document.createElement("div")
    productCard.classList.add("product")
    productCard.innerHTML = `<h2>${product.name}</h2>
                             <p>Kategooria : ${product.category}</p>
                             <p>Hind : $${product.price}</p>
                             <p>ID : ${product.id} </p>
                             `
    const cartButton = document.createElement("button")
    cartButton.textContent = "Lisa ostukorvi"
    cartButton.onclick = (e) => {
     e.stopPropagation()
     cartConstructor.addProduct(product)
    } 
    productCard.append(cartButton)
    container.append(productCard)
}
