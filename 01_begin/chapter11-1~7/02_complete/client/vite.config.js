import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
