import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode || process.env.NODE_ENV || "development", process.cwd(), "");
  console.log(`Config-level API: ${env.VITE_API_BASE_URL}`);

  return {
    plugins: [react()],
    css: {
      modules: { localsConvention: "camelCaseOnly" },
    },
    server: {
      port: 5173,
      open: true,
    },
    test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    globals: true, // lets you use expect() without import if you like
    alias: { },   // if you use path aliases, mirror them here
    }
  };
});
