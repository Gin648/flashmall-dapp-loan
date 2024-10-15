import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
import i18n from "@/i18n";
import App from "./App.vue";
import router from "./router";

store.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(router);

app.mount("#app");
