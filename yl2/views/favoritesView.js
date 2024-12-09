import { costumerConstructor } from "../constructors/Customer.js"

export function favoritesView(){
    const favorites = costumerConstructor.getAllFavorites()
    
    const container = document.getElementById("mainDiv");
    container.innerHTML = "<h2>Lemmikud</h2>"

    favorites.forEach(item => {
        const faveItems = document.createElement("div")
        faveItems.classList.add("faveItem")
        faveItems.innerHTML = `Nimi: ${item.product.name}.
                               Hind: $${item.product.price}`
        container.appendChild(faveItems)
    })

}