import { db } from "../utils/db.js";
import { createEmbedding } from "../utils/openai.js";

export const searchProducts = async (params) => {
  const embedding = await createEmbedding(params.query);
  const binds = { limit: params.limit || 5, embedding: embedding };
  let sql = `
    SELECT * FROM products
    WHERE ROWID IN (
      SELECT ROWID FROM vss_products
      WHERE vss_search(embedding, vss_search_params(:embedding, :limit))
    )
`;
  if (params.category) {
    binds.category = params.category;
    sql += "AND category = :category\n";
  }
  sql += "LIMIT :limit";
  return db.prepare(sql).all(binds);
};
