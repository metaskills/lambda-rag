import express from "express";
import { openai } from "../utils/openai.js";
import { functions } from "../utils/functions.js";

export const messagesRouter = express.Router();

messagesRouter.post("", async (req, res, next) => {
  let functionCall, firstPartStreamed;
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: req.body.messages,
    stream: true,
    functions: functions,
  });
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  for await (const part of stream) {
    if (
      !firstPartStreamed &&
      !functionCall &&
      part.choices[0]?.delta.function_call
    ) {
      functionCall = part.choices[0]?.delta.function_call;
      res.setHeader("Content-Type", "text/function-call");
    } else {
      if (functionCall) {
        functionCall.arguments +=
          part.choices[0]?.delta.function_call?.arguments || "";
      } else {
        res.write(part.choices[0]?.delta.content || "");
      }
    }
    firstPartStreamed = true;
  }
  if (functionCall) {
    res.write(JSON.stringify(functionCall));
  }
  res.end();
});
