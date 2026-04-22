import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'EchoBloom',
      formats: ['iife'],
      fileName: () => 'echobloom-widget.iife.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
