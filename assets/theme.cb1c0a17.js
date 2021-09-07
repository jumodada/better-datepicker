import{aJ as e,aB as o,Z as t,_ as r,a5 as n,a3 as a,a4 as s}from"./@vue.78dd21e6.js";import"./highlight.js.02565251.js";const l={class:"markdown-body"},c=a('<h1>Theme</h1><p>We provide 3 ways for custom theme. For now we only support custom of <strong>color</strong>, totally there are 5 colors</p><h2>SCSS Variables</h2><p><code>better-datepicker</code> uses <strong>SCSS</strong> as a pre-compiled language for the selector, you can modify it by downloading <a href="https://github.com/jumodada/better-datepicker/blob/master/src/assets/date-picker.scss" target="_blank"> scss code</a> directly.</p><p>Of course, you need to use <strong>loader</strong> to parse the code.</p><pre><code class="language-scss">$theme-color: #2ECC71;\n$range-color: #eafaf1;\n$text-header-color: #858585;\n$text-th-color: #969595;\n$text-tbody-color: #5f5f5f;\n</code></pre><h2>Style Configuration</h2><p>After configuring the style on this page, you can download the css code and put it into your project file and import it.</p>',8),p=r("h2",null,"Options",-1),d=r("pre",null,[r("code",{class:"language-js"},"  import {defaultOptions} from \"better-datepicker\"\n  defaultOptions({\n    themeColor: '#1890ff',\n    rangeBgColor: '#e6f7ff',\n    tdColor: '#5f5f5f',\n    thColor: '#5f5f5f'\n  })\n")],-1),f=r("p",null,"or",-1),u=r("p",null,[s("only changes theme of the "),r("strong",null,"current instance")],-1),i=r("pre",null,[r("code",{class:"language-js"},"const input = document.querySelector('#input')\nconst instance = createDatePicker(input,{\n  themeColor: '#2a3a4a',\n  rangeBgColor: '#bbbbbb',\n  tdColor: '#5f5f5f',\n  thColor: '#5f5f5f'\n})\n\n")],-1),h={setup:(a,{expose:s})=>(s({frontmatter:{}}),(a,s)=>{const h=e("theme-card");return o(),t("div",l,[c,r("p",null,[n(h)]),p,d,f,u,i])})};export{h as default};
