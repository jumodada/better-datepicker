<!-- <HEADER> // IGNORE IT -->

# Better-datepicker

A PC Datepicker with only 9KB

![](https://camo.githubusercontent.com/b39d1e12ba779319ff9bab0f56ba7e41f108d898/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6a756d6f646164612f76756558696e2e737667)
![code-test](https://github.com/jumodada/better-datepicker/workflows/code-test/badge.svg)
![](https://travis-ci.com/jumodada/better-datepicker.svg?branch=main)
![](https://img.shields.io/codecov/c/github/jumodada/better-datepicker/master.svg)
![](http://img.badgesize.io/https://unpkg.com/better-datepicker/dist/betterDatePicker.es5.js?compression=gzip)
[![install size](https://packagephobia.com/badge?p=better-datepicker)](https://packagephobia.com/result?p=better-datepicker)

<img width="480px" src="https://raw.githubusercontent.com/jumodada/img-store/main/better-datepciker-demo.png"/>

## Doc

https://jumodada.github.io/better-datepicker/

## CDN

https://cdn.jsdelivr.net/npm/better-datepicker@0.2.2/

## Installing

Using npm:

```bash
$ npm i better-datepicker
```

Using yarn:

```bash
$ yarn add better-datepicker
```

## Usage

es5

```js
import { createDatePicker } from 'better-datepicker'
import 'better-datepicker/dist/index.css'
```

CommonJS

```js
const { createDatePicker } = require('better-datepicker').default
require('better-datepicker/dist/index.css')
```

## Example

```html
<input type="text" id="input" />
```

```js
const input = document.querySelector('#input')
createDatePicker(input, {
  placement: 'bottom',
  type: 'date',
  zIndex: 2000,
  format: 'yyyy/MM/dd',
})
```

you can also

```html
<div id="wrapper">
  <span>Including children, find the first inputElement</span>
  <input type="text" />
</div>
<script>
  const input = document.querySelector('#wrapper')
  createDatePicker(input, {
    placement: 'bottom',
    type: 'date',
    zIndex: 2000,
    format: 'yyyy/MM/dd',
  })
</script>
```

todo: support virtual dom

# Options Validator

If the format is illegal, it will use default value

## Options

When you change options property, it will be automatically updated on the datepicker

| Options      | Description                                                                            | Type     | Accepted Values                                        | Default    |
| ------------ | -------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------ | ---------- |
| placeholder  | To set placeholder                                                                     | string   | -                                                      | -          |
| type         | Type of datepicker                                                                     | string   | date/date-range/month/month-range/year/year-range/week | date       |
| format       | To set the date format                                                                 | string   | -                                                      | yyyy/MM/dd |
| classes      | To set the picker wrapper classes(**It will have a logo prefix: better-datepicker**)   | string[] | -                                                      | -          |
| zIndex       | z-index of Picker                                                                      | number   | -                                                      | 2000       |
| style        | To set the picker wrapper style(**zIndex Priority is lower than above**)               | Object   | -                                                      | -          |
| placement    | Placement of datepicker                                                                | string   | top/bottom/right/left                                  | bottom     |
| disabledDate | Specifies the date that cannot be selected                                             | function | -                                                      | -          |
| offset       | Distance between Picker and inputElement                                               | number   | -                                                      | 12         |
| insertTo     | Name of the node inserted                                                              | string   | body/parent                                            | body       |
| binding      | Bind the value of the inputElement                                                     | boolean  | -                                                      | true       |
| themeColor   | Theme color(selected、hover、range-start、range-end), like _#2ECC71_                   | string   | -                                                      | -          |
| rangeBgColor | The backgroundColor that element is in range ,It's usually lighter than the themeColor | string   | -                                                      | -          |
| tdColor      | Td text color                                                                          | string   | -                                                      | -          |
| thColor      | Th text color                                                                          | string   | -                                                      | -          |

## Default Options

global config

```js
import { defaultOptions } from 'better-datepicker'
defaultOptions({
  placement: 'bottom',
  type: 'date',
  zIndex: 2000,
  format: 'yyyy/MM/dd',
})
```

## Theme

you can use **defaultOptions**

```js
import { defaultOptions } from 'better-datepicker'
defaultOptions({
  themeColor: '#1890ff',
  rangeBgColor: '#e6f7ff',
  tdColor: '#5f5f5f',
  thColor: '#5f5f5f',
})
```

or

only changes theme of the current instance

```js
const input = document.querySelector('#wrapper')
const instance = createDatePicker(input, {
  themeColor: '#1890ff',
  rangeBgColor: '#e6f7ff',
  tdColor: '#5f5f5f',
  thColor: '#5f5f5f',
})
```

## Locale

global config

```js
import { locale } from 'better-datepicker'
import zhCn from 'better-datepicker/dist/locale_es/zh-cn' // es
//require('better-datepicker/dist/locale_umd/zh-cn') // cjs
locale(zhCn)
```

| Locale/Language    | Abbreviation/Link                                                                  |
| ------------------ | ---------------------------------------------------------------------------------- |
| Afghanistan        | [af](https://github.com/jumodada/better-datepicker/blob/master/locale/af.ts)       |
| Brazil             | [br](https://github.com/jumodada/better-datepicker/blob/master/locale/br.ts)       |
| English            | [en](https://github.com/jumodada/better-datepicker/blob/master/locale/en.ts)       |
| Australia          | [en-au](https://github.com/jumodada/better-datepicker/blob/master/locale/en-au.ts) |
| Canada             | [en-au](https://github.com/jumodada/better-datepicker/blob/master/locale/en-ca.ts) |
| England            | [en-gb](https://github.com/jumodada/better-datepicker/blob/master/locale/en-gb.ts) |
| Ireland            | [en-ie](https://github.com/jumodada/better-datepicker/blob/master/locale/en-ie.ts) |
| Spain              | [es](https://github.com/jumodada/better-datepicker/blob/master/locale/es.ts)       |
| Finland            | [fi](https://github.com/jumodada/better-datepicker/blob/master/locale/fi.ts)       |
| Angola             | [fo](https://github.com/jumodada/better-datepicker/blob/master/locale/fo.ts)       |
| Faroe Islands      | [fr](https://github.com/jumodada/better-datepicker/blob/master/locale/fr.ts)       |
| Croatia            | [hr](https://github.com/jumodada/better-datepicker/blob/master/locale/hr.ts)       |
| Haiti              | [ht](https://github.com/jumodada/better-datepicker/blob/master/locale/ht.ts)       |
| Italy              | [it](https://github.com/jumodada/better-datepicker/blob/master/locale/it.ts)       |
| Japan              | [ja](https://github.com/jumodada/better-datepicker/blob/master/locale/ja.ts)       |
| Korea(South)       | [ko](https://github.com/jumodada/better-datepicker/blob/master/locale/ko.ts)       |
| Kuwait             | [ku](https://github.com/jumodada/better-datepicker/blob/master/locale/ku.ts)       |
| Lebanon            | [lb](https://github.com/jumodada/better-datepicker/blob/master/locale/lb.ts)       |
| Laos               | [lo](https://github.com/jumodada/better-datepicker/blob/master/locale/lo.ts)       |
| Ukraine            | [uk](https://github.com/jumodada/better-datepicker/blob/master/locale/uk.ts)       |
| Uzbekistan         | [uz](https://github.com/jumodada/better-datepicker/blob/master/locale/uz.ts)       |
| Chinese            | [zh](https://github.com/jumodada/better-datepicker/blob/master/locale/zh.ts)       |
| Simplified Chinese | [zh-cn](https://github.com/jumodada/better-datepicker/blob/master/locale/zh-cn.ts) |
| Hong Kong China    | [zh-hk](https://github.com/jumodada/better-datepicker/blob/master/locale/zh-hk.ts) |
| Taiwan China       | [zh-tw](https://github.com/jumodada/better-datepicker/blob/master/locale/zh-tw.ts) |

or configure your own region

```
  import {locale} from "better-datepicker"
  const CubaLocale =  {
    name: 'Cuba',
    weekStart: 6,  //Saturday is set as the first day of the week
    months: ["کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەكەم", "تشرینی دووەم", "كانونی یەکەم"],
    weekdays: ["ی", "د", "س", "چ", "پ", "ه", "ش"], //short for week
    weekFormat: 'yyyy-ww'
  }
  locale(CubaLocale)
```

## Instance methods

| name           | Description                                       | params     |
| -------------- | ------------------------------------------------- | ---------- |
| destroyed      | destroyed the datepicker,clear InputElement value | -          |
| onChange       | called callback when date has changed             | (callback) |
| update         | Update configuration, remove old datepicker       | (options)  |
| getCurrentDate | get current date                                  | -          |
| open           | open the datepicker                               | -          |
| close          | close the datepicker                              | -          |
| clear          | clear the date                                    | -          |

## DESTROY

```js
import { destroy } from 'better-datepicker'

const picker1 = createDatePicker('#input1')

// picker1.destroyed()

const picker1 = createDatePickerc('#input2')
destroy([picker1, picker2]) // destroyed picker1 and picker 2
destroy() //destroyed all
```

## USE IN VUE

Reactive updates have been supported since version [0.2.2](https://www.npmjs.com/package/better-datepicker/v/0.2.3)

When a property of props is changed, the datepicker is also updated

```vue
<template>
  <el-input ref="input"></el-input>
</template>

<script lang="ts">
import '../../../assets/svg/svg'
import { defineComponent, toRefs } from 'vue'

import { createDatePicker } from 'better-datepicker'

export default defineComponent({
  name: 'datepicker',
  props: {
    placeholder: String,
    //....
  },
  data() {
    return {
      datepicker: null,
    }
  },
  mounted() {
    const input = this.$refs.input
    this.datepicker = createDatePicker(input.$el, this.$props)
  },
  beforeUnmount() {
    this.datepicker.destroyed()
  },
})
</script>
```

## TODO LIST

| versions | Description                                                                        |
| -------- | ---------------------------------------------------------------------------------- |
| 0.2.9    | monorepo                                                                           |
| 0.3.0    | support unlinkPanels、zIndex、readonly、default-value、className、style、size .... |
| 0.7.0    | support extends plugins                                                            |
| 0.9.0    | support time picker                                                                |

## Browser support

todo

## License

[MIT](https://github.com/jumodada/better-datepicker/blob/master/LICENSE)
