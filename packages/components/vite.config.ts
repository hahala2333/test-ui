/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from "vite-plugin-dts";
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync   } from 'fs';
import path from 'path';
import semver from 'semver';


export default defineConfig({
  test: {
    environment: "happy-dom"
},
    build: {
      outDir: "es",
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue', /\.less/, 'element-plus', 'element-plus/dist/index.css'],
          input: ['index.ts'],
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
        
        },
        lib: {
          entry: resolve(__dirname, 'index.ts'),  // 你的入口文件路径
          formats: ['es', 'cjs'],
        },
      },
    plugins: [
        vue(),
        DefineOptions(), // 添加 DefineOptions 插件
        dts({
          entryRoot: "./src",
          outputDir: ["../testUI/es/src", "../testUI/lib/src"],
          //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
          tsConfigFilePath: "../../tsconfig.json",
        }),
          {
      name: 'style',
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);

        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件

          this.emitFile({
            type: 'asset',
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.less/g, '.css')
          });
        }
      }
    },
    {
      name: 'update-package-json',
      closeBundle() {
        // 确保读取路径正确
        const packageJsonPath = path.resolve(__dirname, 'package.json');

        // 检查源 package.json 是否存在
        if (!existsSync(packageJsonPath)) {
          console.error(`Error: package.json file not found at ${packageJsonPath}`);
          return;
        }

        // 读取并更新 package.json 的版本号
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        packageJson.version = semver.inc(packageJson.version, 'patch');
        // 更新输出文件的内容
        const updatedPackageJson = {
          name: "test-ui",
          version: packageJson.version,
          main: "lib/index.js",
          module: "es/index.mjs",
          files: ["es", "lib", "package.json"],
          keywords: ["testUI", "vue3组件库"],
          sideEffects: ["**/*.css"],
          author: packageJson.author,
          license: packageJson.license,
          description: packageJson.description || "",
          typings: "lib/index.d.ts",
        };
        // 输出目录路径，设置为 testUI
        const outputDir = path.resolve(__dirname, '../testUI');
        const outputPackageJsonPath = path.join(outputDir, 'package.json');

        try {
          // 检查并创建 testUI 目录
          if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
          }

          // 写入更新后的 package.json 到 testUI 目录
          writeFileSync(outputPackageJsonPath, JSON.stringify(updatedPackageJson, null, 2));

          // 更新源 package.json 文件的版本号
          writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

          console.log(`New version ${packageJson.version} updated and package.json written to testUI folder.`);
        } catch (err:any) {
          console.error(`Error writing package.json: ${err.message}`);
        }
      }
    }
      ],
      
});


