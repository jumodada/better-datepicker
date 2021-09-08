import{aJ as e,aB as o,Z as t,_ as r,a5 as a,a3 as n}from"./@vue.78dd21e6.js";import"./highlight.js.02565251.js";const s={class:"markdown-body"},l=n('<h1>Theme 主题</h1><p>提供三种方式用于修改<strong>主题</strong></p><h2>SCSS Variables</h2><p><code>better-datepicker</code> uses <strong>SCSS</strong> as a pre-compiled language for the selector, you can modify it by downloading <a href="https://github.com/jumodada/better-datepicker/blob/master/src/assets/date-picker.scss" target="_blank"> scss code</a> directly.</p><p>Of course, you need to use <strong>loader</strong> to parse the code.</p><pre><code class="language-scss">$theme-color: #2ECC71;\n$range-color: #eafaf1;\n$text-header-color: #858585;\n$text-th-color: #969595;\n$text-tbody-color: #5f5f5f;\n</code></pre><h2>Style Configuration 配置下载</h2><p>配置完成后，下载引入</p>',8),c=r("h2",null,"Options 全局配置",-1),d=r("pre",null,[r("code",{class:"language-js"},"  import {defaultOptions} from \"better-datepicker\"\n  defaultOptions({\n    themeColor: '#1890ff',\n    rangeBgColor: '#e6f7ff',\n    tdColor: '#5f5f5f',\n    thColor: '#5f5f5f'\n  })\n")],-1),p=r("p",null,"或者局部配置",-1),f=r("pre",null,[r("code",{class:"language-js"},"const input = document.querySelector('#input')\nconst instance = createDatePicker(input,{\n  themeColor: '#2a3a4a',\n  rangeBgColor: '#bbbbbb',\n  tdColor: '#5f5f5f',\n  thColor: '#5f5f5f'\n})\n\n")],-1),u={setup:(n,{expose:u})=>(u({frontmatter:{}}),(n,u)=>{const i=e("theme-card");return o(),t("div",s,[l,r("p",null,[a(i)]),c,d,p,f])})};export{u as default};