import Database from "better-sqlite3";
import * as sqlite_vss from "sqlite-vss";

import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, "../../db/lambdarag.db");
export const db = new Database(dbFile, {
  readonly: !!process.env.AWS_EXECUTION_ENV,
});
sqlite_vss.load(db);
