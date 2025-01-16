import express from "express";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));


const fetchAndSaveProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  await fs.writeFile("./data/products.json", JSON.stringify(products, null, 2));
};

app.get("/api/products", async (req, res) => {
    const filePath = "./data/products.json"
  
    await fetchAndSaveProducts();

  // Loe andmed failist
  const rawData = await fs.readFile(filePath, "utf-8");

  // Parssige andmed
  const products = JSON.parse(rawData);

  // Seadista vastuse päised
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  // Tagasta andmed kasutajale
  res.status(200).json(products);
});


app.get("/fetch-products", async (req, res) => {
  await fetchAndSaveProducts();
  res.status(200).json({ message: "Andmed salvestatud products.json faili" });
});


app.listen(3000, () => console.log("server run"));
