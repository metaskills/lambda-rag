import { backendHost } from "@/utils/backend.js";

export const functionCaller = async (message) => {
  const queryParams = JSON.parse(message.content);
  const queryString = new URLSearchParams(queryParams).toString();
  const pathParams = `/functions/${message.name}?${queryString}`;
  const response = await fetch(backendHost(pathParams), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
