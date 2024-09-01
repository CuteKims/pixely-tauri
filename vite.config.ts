import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr"
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), svgr({
    svgrOptions: {
      svgProps: {
        height: '24px',
        width: '24px',
        color: 'var(--global-text-color)',
        filter: 'var(--global-svg-shadow)'
      }
    }})],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
}));
