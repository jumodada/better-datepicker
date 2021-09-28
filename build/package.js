const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const { rollup } = require('rollup')
const getConfig = require('./rollup.config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getFilesName() {
  return fs.readdirSync(resolve('packages'))
}

function build() {

  const filesName = getFilesName()
  // test
  filesName.filter((_, idx) => idx !== filesName.length-1).forEach(name => {
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
  // fsExtra.remove(`./packages/${name}/dist`, err => {
  //   if (err) return console.error(err)
  // })
  fsExtra.copy(`./dist/types/${name}/src`,`./packages/${name}/dist/types`, function (err) {
    if (err)  console.error(err)
  });
}

function removeDistFolder(){
  fsExtra.remove('./dist', err => {
    if (err) return console.error(err)
    console.log('success!')
  })
}

build()
