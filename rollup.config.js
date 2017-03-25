
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

export default {
  acorn: {
    allowReserved: true
  },
  context: 'window',
  dest: './example/runapp.js',
  entry: './example/app.js',
  //exports: 'default',
  format: 'umd',
  //moduleName: 'Chart',
  plugins: [
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    json({
      exclude: ['node_modules/**'],
    }),
    progress({ clearLine: true }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser:true,
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false,
    }),
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      runtimeHelpers: true
    }),
  ],
  sourceMap: false,
};
