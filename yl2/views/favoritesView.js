export function favoritesView(favorites){
    const container = document.getElementById("mainDiv");
    container.innerHTML = "<h2>Lemmikud</h2>"

    favorites.forEach(item => {
        const faveItems = document.createElement("div")
        faveItems.classList.add("faveItem")
        faveItems.innerHTML = `Nimi: ${item.name}.
                               Hind: $${item.price}`
        container.appendChild(faveItems)
    })

}