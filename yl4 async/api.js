import { Product } from "./constructors/Product.js";
const BASE_URL = "https://fakestoreapi.com";
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductsDataByCategory = async (category) => {
  try {
    const data = await fetch(`${BASE_URL}/products/category/${category}`);
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
    const data = await fetch(`${BASE_URL}/products/categories`);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductData = async (productId) => {
  try {
    const data = await fetch(`${BASE_URL}/products/${productId}`);
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
