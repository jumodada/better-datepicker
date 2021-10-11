import Vue from '@vitejs/plugin-vue'
import md from './src/plugins/md-loader'
import fs from 'fs'
import path from 'path'

function resolve(dir: string) {
  return path.join(__dirname, '..', dir)
}

function getPackagesFilesName() {
  return fs.readdirSync(resolve('packages'))
}

function getAlias() {
  return getPackagesFilesName().map((item) => {
    const find =
      item.indexOf('better') > -1 ? item : `@better-datepicker/${item}`
    return { find, replacement: find + '/src' }
  })
}

export default {
  root: '.',
  server: {
    port: 8848,
  },
  resolve: {
    alias: getAlias(),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: function (id: any) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md(),
  ],
}
