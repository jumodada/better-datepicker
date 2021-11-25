<template>
  <el-input ref='input'></el-input>
</template>

<script lang='ts'>
import '../../../assets/svg/svg'
import { defineComponent } from 'vue'

 import { createDatePicker } from 'better-datepicker'

export default defineComponent({
  name: 'datepicker',
  props:{
    placeholder: String,
    type: {
      type: String,
      default: 'date-range'
    },
    disabledDate:{
      type:Function,
      default(){
        return true
      }
    },
    // rangBgColor: {
    //   type: String,
    //   default: '#ffffff'
    // }
  },
  updated() {
    this.datepicker.update(this.$props)
  },
  data() {
    return {
      datepicker: null,
    }
  },
  mounted() {
    const input = this.$refs.input
    this.datepicker = createDatePicker({
      ...this.$props,
      reference: input.$el,
      type: 'date-range'
    })
  },
  beforeUnmount() {
    this.datepicker.destroyed()
  }
})
</script>

<style scoped lang='scss'>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.b-icon {
  width: 1em;
  height: 1em;

  &.loading {
    animation: spin 1s infinite linear;
  }
}
</style>
