const json = require("rollup-plugin-json")
const typescript = require("rollup-plugin-typescript2")
const commonjs = require("rollup-plugin-commonjs")
const resolve = require("rollup-plugin-node-resolve")
const sourceMaps = require("rollup-plugin-sourcemaps")

const {rollup} = require('rollup')
const fs = require('fs')
const {terser} = require('rollup-plugin-terser')


async function build(option: any) {
    const bundle = await rollup(option.input)
    await bundle.write(option.output_es)
    await bundle.write(option.output_umd)
}

const rollupConfig = (config: any) => {
    const {input, fileName, name} = config
    return {
        input: {
            input,
            plugins: [
                json(),
                typescript({useTsconfigDeclarationDir: true}),
                commonjs(),
                resolve(),
                sourceMaps(),
                terser()
            ],
        },
        output_es: {
            file: './dist/locale_es/' + fileName,
            format: 'es',
            name
        },
        output_umd: {
            file: './dist/locale_umd/' + fileName,
            format: 'umd',
            name
        }
    }
}

(async () => {
    try {
        const locales = await fs.readdirSync('./locale')
        locales.forEach((l: string) => {
            build(rollupConfig({
                input: `./locale/${l}`,
                fileName: l.replace('ts', 'js'),
                name: l.split('.ts').shift()
            }))
        })
        await fs.readFile('./dist/types/index.d.ts', 'utf8', function (err: null, data: string) {
            if (err) {
                throw err;
            }
            const curData = data.replace(/\.\//g, './types/')
            fs.writeFile('./dist/index.d.ts', curData, 'utf8', function (error: null) {
                if (error) {
                    throw error;
                }
            });
        })
    } catch (e) {
        console.error(e)
    }
})()
