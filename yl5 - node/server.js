import express from "express";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "products.json");
const FAVOURITES_FILE = path.join(__dirname, "data", "favorites.json");
const filePath = DATA_FILE;
const favePath = FAVOURITES_FILE;

app.use(express.static("public"));
app.use(express.json());

const setCommonHeaders = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
};

app.use(setCommonHeaders);

const readAndParseFile = async () => {
  try {
    // Loe andmed failist ja Parssige andmed
    const rawData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    throw new Error("Andmete lugemine ebaõnnestus");
  }
};

const readAndParseFave = async () => {
  try {
    // Loe andmed failist ja Parssige andmed
    const rawData = await fs.readFile(favePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    throw new Error("Andmete lugemine ebaõnnestus");
  }
};

const fetchAndSaveProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  await fs.writeFile("./data/products.json", JSON.stringify(products, null, 2));
};

app.get("/api/favorites", async (req, res) => {
  try {
    const allFaveData = await readAndParseFave();
    res.status(200).json(allFaveData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/favorites/:clientId", async (req, res) => {
  try {
    const faveData = await readAndParseFave();
    const faveIds = faveData[req.params.clientId] || [];
    const data = await readAndParseFile();
    const products = data.filter((product) => faveIds.includes(product.id));
    if (!products) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    // Return the product data to the client
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reading favorites data" });
  }
});

app.post("/api/favorites/:clientId/:productId", async (req, res) => {
  try {
    const faveData = await readAndParseFave();
    const faveIds = faveData[req.params.clientId] || [];
    faveIds.push(parseInt(req.params.productId));
    const uniqueIds = [...new Set(faveIds)];
    faveData[req.params.clientId] = uniqueIds;

    await fs.writeFile(favePath, JSON.stringify(faveData, null, 2));
    res.status(200).json(uniqueIds);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/favorites/:clientId/:productId", async (req, res) => {
  try {
    const faveData = await readAndParseFave();
    const faveIds = faveData[req.params.clientId] || [];
    const updateFaveIds = faveIds.filter(
      (id) => id !== parseInt(req.params.productId)
    );
    faveData[req.params.clientId] = updateFaveIds;

    await fs.writeFile(favePath, JSON.stringify(faveData, null, 2));
    res.status(200).json(faveData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await readAndParseFile();

    // Tagasta andmed kasutajale
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const products = await readAndParseFile();

    const categoryProducts = products.filter(
      (item) => item.category === req.params.category
    );
    if (categoryProducts.length > 0) {
      res.status(200).json(categoryProducts);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

app.get("/api/products/categories", async (req, res) => {
  try {
    const products = await readAndParseFile();
    const categories = products.map((item) => item.category);
    const uniqueArray = [...new Set(categories)];

    res.json(uniqueArray);
  } catch (error) {
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await readAndParseFile();
    const product = products.find((p) => p.id === parseInt(req.params.id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

app.get("/fetch-products", async (req, res) => {
  await fetchAndSaveProducts();
  res.status(200).json({ message: "Andmed salvestatud products.json faili" });
});

app.listen(3000, () => console.log("server run"));
