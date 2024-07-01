import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import testUI from "@test-ui/components";
const app = createApp(App);
app.use(testUI);
app.mount("#app");
