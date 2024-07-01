// utils/index.ts
import type { App, Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name;
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};


