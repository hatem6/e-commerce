import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueLayouts from "vite-plugin-vue-layouts";

export default defineConfig({
  plugins: [
    vue(),
    vueLayouts({
      // Customize as needed, for example:
      // layouts: 'src/layouts' // Path to your layout components
    }),
  ],
});
