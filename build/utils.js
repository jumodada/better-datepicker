const  path  = require('path')
const  fs  = require('fs')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getPackagesFilesName() {
  return fs.readdirSync(resolve('packages'))
}

module.exports = {
  getPackagesFilesName
}
