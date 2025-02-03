import { Order } from "./Order.js";
import {
  addFaveProductToClient,
  removeFaveProductFromClient,
  getFavoritesByClient,
} from "../api.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.id = null;
    this.orderHistory = [];
    this.favorties = this.loadFavoritesFromLocalStorage();

  }

 

  saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem(`favorites-${this.id}`, JSON.stringify(favorites));
  }

  loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem(`favorites-${this.id}`);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  async syncFavoritesWithBackend() {
    const updatedFavorites = await getFavoritesByClient(this.id);
    this.favorties = updatedFavorites;

    this.saveFavoritesToLocalStorage(updatedFavorites);
  }

  placeOrder(cart) {
    let newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
    newOrder.printOrder();
  }

  printOrderHistory() {
    this.orderHistory.forEach((item, index) =>
      console.log(
        `${
          index + 1
        }. Order Date: ${item.orderDate.toLocaleString()}. Total: €${item.cart.calculateTotal()}`
      )
    );
  }

  async toggleFavorites(product) {
    const isFavorite = this.isFavorite(product);

    if (isFavorite) {
      await removeFaveProductFromClient(this.id, product.id);
      this.favorties = this.favorties.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      await addFaveProductToClient(this.id, product.id);
      this.favorties.push({ product });
    }

    this.saveFavoritesToLocalStorage(this.favorties);


    return !isFavorite;
  }

  isFavorite(product) {
    return this.favorties.some((item) => item.product.id === product.id);
  }

  getAllFavorites() {
    return this.favorties;
  }
}

export const costumerConstructor = new Customer();
