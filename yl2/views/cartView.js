export function displayCartView(products){
    const mainDiv = document.getElementById("mainDiv")
    mainDiv.innerHTML = "<h2>Ostukorv</h2>"

    const productContainer = document.createElement("div")
    productContainer.classList.add("ostukorv-container")

    products.forEach((product) =>{
        const productCard = document.createElement("div");
        productCard.classList.add("cartItem")
        productCard.innerHTML = `<h3>${product.name}</h3>
                                <p>Hind $${product.price}</p>
                                <p>Kogus: ${product.quantity}</p>`
        productContainer.append(productCard);
    })
    mainDiv.append(productContainer)
}