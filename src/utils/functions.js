import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { readFileSync } from "fs";

const functionsFile = path.join(__dirname, "./functions.json");
const functions = JSON.parse(readFileSync(functionsFile, "utf8"));

export { functions };
