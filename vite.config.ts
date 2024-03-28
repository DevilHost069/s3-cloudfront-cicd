import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: "/src/components",
      },
      {
        find: "@pages",
        replacement: "/src/pages",
      },
      {
        find: "@utils",
        replacement: "/src/utils",
      },
      {
        find: "@shared",
        replacement: "/src/shared",
      },
      {
        find: "@routes",
        replacement: "/src/routes",
      },
      {
        find: "@assets",
        replacement: "/src/assets",
      },
      {
        find: "@server",
        replacement: "/src/server",
      },
      {
        find: "@contexts",
        replacement: "/src/contexts",
      },
      {
        find: "@hooks",
        replacement: "/src/hooks",
      },
    ],
  },
});

const vitetestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup.ts"],
  },
});

export default mergeConfig(vitetestConfig, viteConfig);
