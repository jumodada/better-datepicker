import Vue from '@vitejs/plugin-vue'
import md from './src/plugins/md-loader'

export default {
  root: '.',
  server: {
    port: 8848,
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
