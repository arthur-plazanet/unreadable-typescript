import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/enum/index.ts', 'src/interface/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
});
