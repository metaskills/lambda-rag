import { db } from "../src/utils/db.js";

db.exec("UPDATE products SET embedding = NULL");
db.exec("VACUUM");
