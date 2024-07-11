import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        server: path.resolve(__dirname, "../server"),
        "server/*": path.resolve(__dirname, "../server/*"),
        components: path.resolve(__dirname, "./src/components"),
        lib: path.resolve(__dirname, "./src/lib"),
        assets: path.resolve(__dirname, "./src/assets"),
        useQueryClient: path.resolve(__dirname, "./src/useQueryClient.ts"),
        App: path.resolve(__dirname, "./src/App.tsx"),
        views: path.resolve(__dirname, "./src/views"),
      },
    },
    server: {
      port: parseInt(process.env.VITE_CLIENT_PORT),
    },
    build: {
      outDir: path.resolve(__dirname, "../../dist/client"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[ext]",
          chunkFileNames: "chunks/[name].js",
          entryFileNames: "entry/[name].js",
        },
      },
    },
  });
};
