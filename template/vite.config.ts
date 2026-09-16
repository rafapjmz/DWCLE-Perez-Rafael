import { defineConfig } from 'vitest/config';
import autoprefixer from 'autoprefixer';

// Carpeta de salida de cada tipo de recurso dentro de dist/
const assetFolders: Record<string, string> = {
  css: 'styles',
  png: 'images',
  jpg: 'images',
  jpeg: 'images',
  gif: 'images',
  svg: 'images',
  webp: 'images',
  woff: 'fonts',
  woff2: 'fonts',
  ttf: 'fonts',
};

export default defineConfig({
  // El proyecto vive en src/: index.html es la entrada y las rutas se resuelven desde ahí
  root: 'src',
  publicDir: '../public',
  // La caché de dependencias va al node_modules de la raíz y no a src/node_modules
  cacheDir: '../node_modules/.vite',
  server: {
    port: 5173,
    open: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names[0] ?? '';
          const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
          const folder = assetFolders[extension];
          return folder ? `assets/${folder}/[name][extname]` : 'assets/[name][extname]';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../coverage',
    },
  },
});
