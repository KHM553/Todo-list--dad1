import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Todo-list--dad1/", // غيّرها إذا اسم الريبو غير
});
