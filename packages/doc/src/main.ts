import { createApp, nextTick } from 'vue'
import App from './App.vue'
import Router from './router'
import { useComponent } from './package'
import highlightJs from 'highlight.js'
import './assets/style/index.scss'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/style/el-message.css'
import {createDatePicker} from 'better-datepicker'
console.log(createDatePicker)
import NProgress from 'nprogress'
import { useElementComponent } from './useElementComponent'
//import xx from '../../dist/locale_es/zh-cn'
// locale(xx)
// defaultOptions({
//     themeColor: '#1890ff',
//     rangeBgColor: '#e6f7ff',
//     tdColor: '#5f5f5f',
//     thColor: '#5f5f5f',
// })

NProgress.configure({
  easing: 'ease',
  speed: 200,
  showSpinner: true,
  trickleSpeed: 200,
})

highlightJs.initHighlightingOnLoad();

const app = createApp(App)
useComponent(app)
useElementComponent(app)

app.config.globalProperties.createDatePicker = createDatePicker

highlightJs.configure({
  languages: ['js', 'html'],
})

Router.afterEach((event) => {
  nextTick(() =>
    document
      .querySelectorAll('pre code')
      .forEach((block) => highlightJs.highlightBlock(block as any))
  )
})
app.use(Router)
app.mount('#app')
