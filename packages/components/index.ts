import { App } from "vue";
import * as components from "./src/index";
// 也导出所有单个组件，支持按需引入
export * from "./src/index";

export default {
  install: (app: App) => {
    for (let c in components) {
      app.use(components[c]);
    }
  },
};
