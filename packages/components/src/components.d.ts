import * as components from "./index";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    TestButton: typeof components.Button;
    TestElButton: typeof components.ElButton;
  }
}

export {};
