const {getPackagesFilesName} = require('./utils')
const packagesName = getPackagesFilesName().filter((name)=>name !== 'doc' &&  name.indexOf('better') === -1)

module.exports = {
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    testEnvironment: 'jsdom',
    testRegex: '/__tests__/.*\\.(test|spec)\\.(ts)$',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    coveragePathIgnorePatterns: ['/node_modules/', '/src/svg'],
    coverageThreshold: {
        global: {
            functions: 2,
            lines: 1,
            statements: 1
        }
    },
    collectCoverageFrom:packagesName.reduce(
      (acc,name)=> {
          return acc.concat([`packages/${name}/src/**/*.{ts,js}`,`packages/${name}/src/*.{ts,js}`])
      }
    ,[])
}
