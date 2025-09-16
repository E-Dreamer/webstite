/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const componentOptions: DefineComponent<{},{},any>;
  export default componentOptions;
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_API_TITLE:string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
