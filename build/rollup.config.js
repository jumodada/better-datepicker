const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const sourceMaps = require('rollup-plugin-sourcemaps')
const typescript = require('rollup-plugin-typescript2')
const json = require('rollup-plugin-json')

const { terser } = require('rollup-plugin-terser')

const getConfig = (name) => {
  const dir = `./packages/${name}`
  return {
    input: [`${dir}/src/index.ts`],
    output: [
      {
        file: `${dir}/dist/${name}.umd.js`,
        name,
        format: 'umd',
        sourcemap: false,
      },
      { file: `${dir}/dist/${name}.esm.js`, sourcemap: false,format: 'es' },
    ],
    external: [],
    plugins: [
      json(),
      typescript({ useTsconfigDeclarationDir: true }),
      commonjs(),
      resolve(),
      sourceMaps(),
      terser(),
    ],
  }
}
module.exports = getConfig
