import { db } from "../src/utils/db.js";
import { readFileSync } from "fs";
import cliProgress from "cli-progress";
import Papa from "papaparse";

const vss_version = db.prepare("select vss_version()").pluck().get();
console.log(`Using sqlite-vss version: ${vss_version}\n`);

/* ==== PRODUCTS ==== */

db.exec(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    subCategory TEXT,
    description TEXT,
    embedding BLOB
  )
`);

db.exec(`
  CREATE VIRTUAL TABLE vss_products using vss0 (
    embedding(1536)
  )
`);

const luxuryFile = "./db/Luxury_Products_Apparel_Data.csv";
const luxuryData = readFileSync(luxuryFile, "utf-8");

const productsData = Papa.parse(luxuryData, { header: true }).data;
const productsBar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);
const productsStmt = db.prepare(`INSERT INTO products (
  id,
  name,
  category,
  subCategory,
  description
) VALUES (?, ?, ?, ?, ?)`);

const insertProduct = async (p) => {
  let id = Number(p[""]);
  let productName = p["ProductName"];
  let description = p["Description"];
  if (!productName) {
    productsBar.increment();
    return;
  }
  if (productName.startsWith('"') && productName.endsWith('"')) {
    productName = productName.slice(1, -1);
  }
  if (description.startsWith('"') && description.endsWith('"')) {
    description = description.slice(1, -1);
  }
  productsStmt.run(
    id,
    productName,
    p["Category"],
    p["SubCategory"],
    description,
  );
  productsBar.increment();
};

console.log("Inserting product data...");
productsBar.start(productsData.length, 0);
productsData.forEach((product) => {
  insertProduct(product);
});

productsBar.stop();
db.close();
