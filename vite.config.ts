import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: `${path.resolve(__dirname, './src/components/')}`,
      pages: `${path.resolve(__dirname, './src/pages/')}`,
      providers: `${path.resolve(__dirname, './src/providers/')}`,
      helpers: `${path.resolve(__dirname, './src/helpers/')}`,
    },
  },
});
