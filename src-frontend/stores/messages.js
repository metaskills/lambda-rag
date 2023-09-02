import { defineStore } from "pinia";
import { backendHost } from "@/utils/backend.js";
import { rolePrompt } from "@/utils/roleprompt.js";
import { functionCaller } from "@/utils/functionCaller.js";
import { marked } from "marked";

export const useMessagesStore = defineStore({
  id: "messages",
  state: () => ({
    messages: [],
    loading: false,
    loadingState: false,
  }),
  actions: {
    add(message) {
      if (this.isEmpty) {
        this.messages.push({
          role: "user",
          content: rolePrompt(message.content),
          contentDisplay: message.content,
        });
      } else {
        this.messages.push(message);
      }
    },
    remove(message) {
      const index = this.messages.indexOf(message);
      this.messages.splice(index, 1);
    },
    async fetchResponse() {
      this.loading = true;
      this.loadedStateChange();
      const messages = this.messagesForAPI;
      this.add({ role: "assistant", content: "..." });
      const response = await fetch(backendHost("/messages"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messages }),
      });
      const functionCall =
        response.headers.get("content-type") === "text/function-call";
      if (functionCall) {
        this.add({ role: "function", content: "", name: "", hidden: true });
      }
      const reader = response.body.getReader();
      const message = functionCall
        ? this.lastMessageOfRole("function")
        : this.lastMessageOfRole("assistant");
      let firstRead = true;
      while (true) {
        if (firstRead) {
          message.content = "";
        }
        firstRead = false;
        const { done, value } = await reader.read();
        if (done) {
          this.loading = false;
          this.loadedStateChange();
          break;
        }
        const content = new TextDecoder().decode(value);
        message.content += content;
        message.contentDisplay = marked.parse(message.content);
        this.loadedStateChange();
      }
      if (functionCall) {
        const functionData = JSON.parse(message.content);
        const functionArgs = JSON.parse(functionData.arguments);
        message.name = functionData.name;
        message.content = JSON.stringify(functionArgs);
        message.contentDisplay = `${message.name}: ${message.content}`;
        const embedding = await functionCaller(message);
        this.remove(this.lastMessageOfRole("assistant"));
        this.add({
          role: "user",
          content: JSON.stringify(embedding),
          hidden: true,
        });
        this.fetchResponse();
      }
    },
    loadedStateChange() {
      this.loadingState = !this.loadingState;
    },
    lastMessageOfRole(role) {
      return Array.from(this.messages)
        .reverse()
        .find((message) => message.role === role);
    },
  },
  getters: {
    isEmpty() {
      return this.messages.length === 0;
    },
    isLoading() {
      return this.loading;
    },
    messagesForAPI() {
      return this.messages.map((m) => {
        const apiMessage = { role: m.role, content: m.content };
        if (m.role === "function") {
          apiMessage.name = m.name;
        }
        return apiMessage;
      });
    },
  },
});
