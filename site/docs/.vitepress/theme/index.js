import DefaultTheme from "vitepress/theme";
import testUI from "test-ui";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.use(testUI);
  },
};
