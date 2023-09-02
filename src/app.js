import env from "./env.js";
import url from "url";
import path from "path";
import express from "express";
import cors from "cors";
import requestLoggingMiddleware from "./middleware/logger.js";
import { messagesRouter } from "./routes/messages.js";
import { functionsRouter } from "./routes/functions.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(requestLoggingMiddleware);
app.get("/is_it_up", (_req, res, _next) => {
  res.json({ code: 200, status: "ok" });
});

if (env.isDevelopment) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    }),
  );
}

app.use("/messages", messagesRouter);
app.use("/functions", functionsRouter);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static("/tmp"));

app.listen(8080, () => {
  console.log("Listening on port: 8080");
});

export default app;
