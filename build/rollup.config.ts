import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('../package.json')
import {terser} from 'rollup-plugin-terser'

const libraryName = 'better-day-time-picker'
const config = {
    input: ['src/index.ts'],
    output: [
        {file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: false},
        {file: pkg.module, format: 'es', sourcemap: false},
    ],
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        json(),
        typescript({useTsconfigDeclarationDir: true}),
        commonjs(),
        resolve(),
        sourceMaps(),
        terser()
    ],
}

export default config
