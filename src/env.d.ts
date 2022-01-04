/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_API: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "virtual:windi.css";
