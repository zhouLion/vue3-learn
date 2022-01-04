import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from 'vite-plugin-windicss'
// 打包插件可用可不用
import viteCompression from 'vite-plugin-compression'

export default defineConfig((cxt) => {
  console.log(process.cwd());
  console.log(loadEnv(cxt.mode, process.cwd()));
  return {
    plugins: [
      vue(),
      WindiCSS(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 指向src即根目录为src
      },
    },
    base: "./", // 打包路径
    server: {
      port: Number(loadEnv(cxt.mode, process.cwd() + '/src').VITE_APP_PORT), // 服务端口号
      open: true, // 是否自动打开浏览器
      cors: true, // 是否允许跨域
      proxy: {
        '/api': {
          target: loadEnv(cxt.mode, process.cwd() + '/src').VITE_APP_BASE_API, // 配置需要前缀 VITE_APP_BASE_API
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        }
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        }
      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: cxt.command !== 'serve',
          drog_debugger: cxt.command !== 'serve',
        }
      }
    }
  }
});
