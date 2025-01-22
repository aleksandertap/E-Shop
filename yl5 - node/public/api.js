import { Product } from "./constructors/Product.js";
const BASE_URL = "https://fakestoreapi.com";
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("/api/products");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductsDataByCategory = async (category) => {
  try {
    const byCategory = category ? `/category/${category}` : ""
    const data = await fetch(`api/products${byCategory}`);
    const productsData = await data.json()
    const dataObject = productsData.map(
      item => new Product(
        item.id,
        item.title,
        item.price,
        item.category,
        item.description,
        item.image
      )
    )
    return dataObject
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategory = async () => {
  try {
    const data = await fetch(`/api/products/categories`);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductData = async (productId) => {
  try {
    const data = await fetch(`api/products/${productId}`);
    const productsData = await data.json()
    const dataObject = productsData.map(
      item => new Product(
        item.id,
        item.title,
        item.price,
        item.category,
        item.description,
        item.image
      )
    )
    return dataObject
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async () => {
  try {
    const data = await fetch(`/api/favorites`);  // Fetch favorites from the backend
    const productsData = await data.json();  // Parse the JSON response

    // Create and return Product objects from the fetched data
    const dataObject = productsData.map(
      item => new Product(
        item.id,
        item.title,
        item.price,
        item.category,
        item.description,
        item.image
      )
    );

    return dataObject;  // Return the array of Product objects
  } catch (error) {
    console.error(error);
  }
};