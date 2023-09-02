import "dotenv-flow/config";
import { db } from "../src/utils/db.js";
import { createEmbedding } from "../src/utils/openai.js";
import inquirer from "inquirer";

const ask = await inquirer.prompt([
  {
    name: "prompt",
    message: "Prompt >",
  },
]);

const embeddingQuery = db.prepare(`
  SELECT * FROM products WHERE ROWID IN (
    SELECT ROWID FROM vss_products
    WHERE vss_search(embedding, vss_search_params(:embedding, 5))
  )
`);

const response = embeddingQuery.all({
  embedding: await createEmbedding(ask.prompt),
});

response.forEach((product) => {
  console.log(`ID: ${product.id}`);
  console.log(`Name: ${product.name}`);
  console.log(`Category: ${product.category}`);
  console.log(`SubCategory: ${product.subCategory}`);
  console.log(`Description: ${product.description}`);
  console.log();
});
