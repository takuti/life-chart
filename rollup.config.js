import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-dom', 'd3'],
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    globals: {'react': 'React', 'react-dom': 'ReactDOM', 'd3': 'd3'},
  },
  plugins: [
    typescript()
  ],
};