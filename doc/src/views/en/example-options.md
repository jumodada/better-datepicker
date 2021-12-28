EXAMPLE-OPTIONS

## Type

:::

```html
<el-form label-position="top">
  <el-form-item label="props">
    <el-select v-model="value" placeholder="Select type">
      <el-option
        v-for="item in datepickerTypesList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="datepicker">
    <el-input id="typeInput" ref="picker" />
  </el-form-item>
</el-form>

<script>
  data(){
    return {
      datepickerTypesList: [
        { value: 'date', label: 'date' },
        { value: 'date-range', label: 'date-range' },
        { value: 'week', label: 'week' },
        { value: 'year', label: 'year' },
        { value: 'year-range', label: 'year-range' },
        { value: 'month', label: 'month' },
        { value: 'month-range', label: 'month-range' },
      ],
      value: '',
    }
  },
  mounted(){
    const input = this.createDatePicker({
      reference: document.querySelector('#typeInput')
    })
  }
</script>
```

:::
