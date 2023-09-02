import { mkdirSync } from "fs";
import "dotenv-flow/config";
import { db } from "../src/utils/db.js";
import { createEmbedding } from "../src/utils/openai.js";
import cliProgress from "cli-progress";
import PQueue from "p-queue";
import { caching } from "cache-manager";
import * as fsStore from "cache-manager-fs-hash";

mkdirSync("db/embeddings-cache", { recursive: true });
const fsStoreCache = fsStore.create({
  path: "db/embeddings-cache",
  ttl: 31536000,
  subdirs: true,
});
const embeddingsCache = await caching(fsStoreCache);

/* ==== PRODUCTS ==== */

const productsQueue = new PQueue({ concurrency: 5, autoStart: false });
const productsBar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);
const productIds = db.prepare("SELECT id FROM products").pluck().all();
const productGetStmt = db.prepare("SELECT * FROM products WHERE id = ?");
const productUpdateStmt = db.prepare(
  "UPDATE products SET embedding = :embedding WHERE id = :id",
);

const productEmbedding = async (productId) => {
  const p = productGetStmt.get(productId);
  const input = await `${p.name} ${p.category} ${p.description}`;
  const embedding = await embeddingsCache.wrap(input, () =>
    createEmbedding(input),
  );
  productUpdateStmt.run({ embedding: embedding, id: productId });
  productsBar.increment();
};

productsQueue.add(() => {
  console.log("Inserting product embeddings...");
  productsBar.start(productIds.length, 0);
});

productsQueue.onIdle().then(() => {
  productsBar.stop();
  console.log("Inserting into vss_products...");
  db.exec(`DELETE FROM vss_products`);
  db.exec(
    `INSERT INTO vss_products(ROWID, embedding) SELECT ROWID, embedding FROM products`,
  );
});

productIds.forEach((productId) => {
  productsQueue.add(() => productEmbedding(productId));
});

productsQueue.start();
