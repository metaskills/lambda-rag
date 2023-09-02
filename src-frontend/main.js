import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "@/App.vue";
import "@/main.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).mount("#app");
