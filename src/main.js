import { createApp } from "vue";
import App from "./App.vue";
import "mathlive/dist/mathlive-fonts.css";
import './assets/base.css';
import * as MathLive from "mathlive/dist/mathlive.mjs"
import MathField from "mathlive/dist/vue-mathlive.mjs";
import router from "./router";
const app = createApp(App);

app.use(MathLive, MathField);
app.use(router);

app.mount("#app");
