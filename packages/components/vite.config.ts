// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from "vite-plugin-dts";
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),  // 你的入口文件路径
          fileName: (format: string) => `test-ui.${format}.js`,  // 输出文件的命名规则
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          
          output: [
            {
              //打包成 ES 模块格式，适用于现代 JavaScript 环境
              format: "es",
              //打包后文件名
              entryFileNames: "[name].mjs",
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: "named",
              //配置打包根目录
              dir: "../testUI/es",
            },
            {
              //打包成 CommonJS 模块格式，适用于 Node.js 环境
              format: "cjs",
              //打包后文件名
              entryFileNames: "[name].js",
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: "named",
              //配置打包根目录
              dir: "../testUI/lib",
            },
          ],
        }
      },
    plugins: [
        vue(),
        dts({
          entryRoot: "./src",
          outputDir: ["../testUI/es/src", "../testUI/lib/src"],
          //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
          tsConfigFilePath: "../../tsconfig.json",
        }),
        DefineOptions(), // 添加 DefineOptions 插件
      ],
});


