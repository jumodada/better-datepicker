const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const { rollup } = require('rollup')
const getConfig = require('./rollup.config')
const {getPackagesFilesName} = require('./utils')

function build() {

  const filesName = getPackagesFilesName()
  // test
  filesName.filter((_, idx) => idx !== filesName.length - 1).forEach(name => {
    const config = getConfig(name)
    config.output.forEach(item => {
      rollup(config).then((bundle) => {
        bundle.write(item).then(() => {
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
  fsExtra.copy(`./dist/types/${name}/src`, `./packages/${name}/dist/types`, function(err) {
    if (err) console.error(err)
  })
}

function removeDistFolder() {
  fsExtra.remove('./dist', err => {
    if (err) return console.error(err)
    console.log('success!')
  })
}

build()
