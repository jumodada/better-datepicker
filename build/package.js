const fs = require('fs')
const path = require('path')
const { rollup } = require('rollup')
const getConfig = require('./rollup.config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getFilesName() {
  return fs.readdirSync(resolve('packages'))
}

// const cc = {
//   file: resolve(`packages/${name}/dist/${name}${type.ext}`),
//   name,
//   format: type.format,
// }

function build() {
  const filesName = getFilesName()
  // test
  filesName.filter((_, idx) => idx === 1).forEach(name => {
    const config = getConfig(name)
    config.output.forEach(item=>{
      rollup(config).then((bundle) => {
        bundle.write(item).then(()=>{
          copyTypingFile(name)
        })
      })
    })

  })
}

function copyTypingFile(name) {
  fs.copyFileSync(`./dist/types/${name}`, `./packages/${name}/dist/types` )
}

build()
