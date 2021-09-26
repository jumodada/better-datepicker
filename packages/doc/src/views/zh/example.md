# Examples

## createDatePicker *(input: HTMLInputElement,options)=>void*

```
const input = document.querySelector('#input')
const picker = createDatePicker(input, {
  type: 'week',
  offset: 20,
  placement: 'bottom',
})
```

## destroyed *()=>void*

```
const input = document.querySelector('#input')
const picker = createDatePicker(input)
picker.destroyed()
```

## destroy *(pickers?: State[])=>void*

```
const input = document.querySelector('#input')
const picker = createDatePicker(input, {
  type: 'week',
  offset: 20,
  placement: 'bottom',
})
```


## USE IN VUE
**Options**的响应式 [0.2.2](https://www.npmjs.com/package/better-datepicker/v/0.2.3)在版本后开始支持

当传入的**options**对象的某个属性值被修改的时候，会同步更新在视图上，这让你无需手动使用**update**函数

```js
export default defineComponent({
  name: 'datepicker',
  props:{
    placeholder: String,
    type: String
    //......
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
  }
}
```

