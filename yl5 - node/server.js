import express from "express";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "products.json");
const FAVOURITES_FILE = path.join(__dirname, "data", "favorites.json")
const filePath = DATA_FILE;

app.use(express.static("public"));
app.use(express.json())

const readAndParseFile = async () => {
  try {
    // Loe andmed failist ja Parssige andmed
    const rawData = await fs.readFile(filePath, "utf-8");
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


app.get("/api/products", async (req, res) => {
  try {
    const products = await readAndParseFile();
    // Seadista vastuse päised
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

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
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

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
