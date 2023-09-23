import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import svgr from 'vite-plugin-svgr';
import ViteCSSExportPlugin from 'vite-plugin-css-export';
import dotenv from 'dotenv';
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), ViteCSSExportPlugin()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, 'src', 'assets'),
      "@components": path.resolve(__dirname, 'src', 'components'),
      "@pages": path.resolve(__dirname, 'src', 'pages'),
      "@router": path.resolve(__dirname, 'src', 'router'),
      "@services": path.resolve(__dirname, 'src', 'services'),
      "@styles": path.resolve(__dirname, 'src', 'styles'),
      "@utils": path.resolve(__dirname, 'src', 'utils'),
    }
  },
  define: {
    __API__ENDPOINT__: JSON.stringify(process.env.API_ENDPOINT)
  }
})
