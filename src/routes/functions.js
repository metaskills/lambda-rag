import express from "express";
import { searchProducts } from "../models/products.js";

export const functionsRouter = express.Router();

functionsRouter.get("/:functionName", async (req, res) => {
  const functionName = req.params.functionName;
  switch (functionName) {
    case "search_products":
      res.json(await searchProducts(req.query));
      break;
    default:
      res.status(404).send("Function not found");
  }
});
