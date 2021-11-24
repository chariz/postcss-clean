/* global process */

import buble from '@rollup/plugin-buble';
import { readFileSync } from 'fs';

const inDevelopment = () =>
  process.env.BUILD_ENV &&
  ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0


const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const rollupOpts = {
  input: pkg.module,
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'default'
  },
  external: Object.keys(pkg.dependencies),
  plugins: [
    buble({
      transforms: { dangerousForOf: true }
    })
  ],
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts
