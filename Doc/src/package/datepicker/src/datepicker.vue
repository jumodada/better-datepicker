<template>
  <el-input ref='input'></el-input>
</template>

<script lang='ts'>
import '../../../assets/svg/svg'
import { defineComponent, toRefs } from 'vue'

import { createDatePicker } from '../../../../../src'

export default defineComponent({
  name: 'datepicker',
  props: {
    type: {
      type: String,
      default: 'date',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      datepickerInstance: null,
    }
  },
  mounted() {
    const input = this.$refs.input
    this.datepickerInstance = createDatePicker(input.$el, this.$props)
  },
  watch: {
    type() {
      this.datepickerInstance.update(this.$props)
    },
    placeholder(){
      this.datepickerInstance.update(this.$props)

    }
  },
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
