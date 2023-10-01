import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    envDir: "./src/config",
    esbuild:
      process.env.NODE_ENV === "production"
        ? { drop: ["console", "debugger"] }
        : "",
  });
};
