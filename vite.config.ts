import { fileURLToPath, URL } from 'node:url'
import {defineConfig, loadEnv, type UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from  '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import commonjs from 'vite-plugin-commonjs'
import legacy from '@vitejs/plugin-legacy'
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig( ({mode}):UserConfig =>{
  let env = loadEnv(mode,process.cwd())
  console.log(env,'env')
  return {
    plugins: [
      commonjs(),
      vue(),
      VueJsx(),
      tsconfigPaths({loose:true}),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      process.env.NODE_ENV === 'development' && vueDevTools(),
    ],
    server: {
      proxy: {},
      port:3000
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
