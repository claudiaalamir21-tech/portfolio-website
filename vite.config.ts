import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio-website/",
  plugins: [TanStackRouterVite(), react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
});
