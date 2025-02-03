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
    const byCategory = category ? `/category/${category}` : "";
    const data = await fetch(`api/products${byCategory}`);
    const productsData = await data.json();
    const dataObject = productsData.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
    return dataObject;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategory = async () => {
  try {
    const data = await fetch(`api/products/categories`);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductData = async (productId) => {
  try {
    const data = await fetch(`api/products/${productId}`);
    const productsData = await data.json();
    const dataObject = productsData.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
    return dataObject;
  } catch (error) {
    console.error(error);
  }
};

export const allFaveData = async () => {
  try {
    const faveData = await fetch("api/favorites");
    return faveData.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFavoritesByClient = async (clientId) => {
  try {
    const data = await fetch(`api/favorites/${clientId}`);
    const productsData = await data.json();

    const dataObject = productsData.map((item) => {
      new Product(
        item.id,
        item.title,
        item.price,
        item.category,
        item.description,
        item.image
      );
    });

    return dataObject;
  } catch (error) {
    console.error(error);
  }
};

export const addFaveProductToClient = async (clientId, productId) => {
  try {
    const data = await fetch(`api/favorites/${clientId}/${productId}`, {
      method: "POST",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.log(error);
  }
};

export const removeFaveProductFromClient = async (clientId, productId) => {
  try {
    const data = await fetch(`api/favorites/${clientId}/${productId}`, {
      method: "DELETE",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.log(error);
  }
};
