import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { execSync } from 'child_process';
import { mkdirSync, cpSync, readFileSync, writeFileSync, createWriteStream } from 'fs';
import { createReadStream } from 'fs';

const config = JSON.parse(readFileSync('./config/production.json', 'utf8')).config;

// Create output dirs
mkdirSync('dist/css', { recursive: true });
mkdirSync('dist/js', { recursive: true });
mkdirSync('dist/img', { recursive: true });
mkdirSync('dist/assets', { recursive: true });

// Compile SCSS
console.log('Compiling SCSS...');
execSync('npx sass src/sass/main.scss dist/css/main.css --style=compressed', { stdio: 'inherit' });

// Bundle JS with Rollup
console.log('Bundling JS...');
const bundle = await rollup({
  input: 'src/js/app.js',
  plugins: [
    replace({
      preventAssignment: true,
      '{{config.ASSET_BASE_PATH}}': config.ASSET_BASE_PATH,
      '{{config.IMAGE_BASE_URL}}': config.IMAGE_BASE_URL,
      '{{config.API_BASE_URL}}': config.API_BASE_URL,
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { modules: false }]],
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
});
await bundle.write({ file: 'dist/js/app.js', format: 'iife', sourcemap: true });

// Concatenate lib files
console.log('Concatenating libs...');
const libFiles = [
  'node_modules/three/build/three.js',
  'node_modules/es6-promise/dist/es6-promise.auto.js',
  'node_modules/fetch-ie8/fetch.js',
  'lib/three-mtl-loader.js',
  'lib/three-obj-loader.js',
  'lib/three-orbit-controls.js',
];
const libContent = libFiles.map(f => readFileSync(f, 'utf8')).join('\n');
writeFileSync('dist/js/lib.js', libContent);

// Copy static files
console.log('Copying static files...');
cpSync('src/index.html', 'dist/index.html');
cpSync('src/img', 'dist/img', { recursive: true });
cpSync('src/assets', 'dist/assets', { recursive: true });

console.log('Build complete.');
