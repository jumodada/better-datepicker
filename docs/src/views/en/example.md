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
Reactive updates have been supported since version [0.2.2](https://www.npmjs.com/package/better-datepicker/v/0.2.3)

When a property of props is changed, the datepicker is also updated. you don't need to update manually

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

