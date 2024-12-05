// kõikide toodete vaade
import { navigate } from "../router.js"

export function displayProducts(products){
    const mainDiv = document.getElementById("mainDiv")
    mainDiv.innerHTML = "<h2>Tooted</h2>"

    const productContainer = document.createElement("div")
    productContainer.classList.add("products-container")

    products.forEach((product) =>{
        const productCard = document.createElement("div");
        productCard.classList.add("product")
        productCard.innerHTML = `<h3>${product.name}</h3>
                                <p>Kategooria: ${product.category}</p>
                                <p>Hind $${product.price}</p>`;

        productCard.onclick = (e) => {
            e.stopPropagation()
            navigate("productDetail", product)
        }

        productContainer.append(productCard);
    })
    mainDiv.append(productContainer)
}
