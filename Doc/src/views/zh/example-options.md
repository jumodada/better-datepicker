Examples-Options

## Type

::: 默认值是*date*, 单位是[**日**]

```html

<el-form label-position="top">
  <el-form-item label='type'>
    <el-select  v-model='value' placeholder='请选择'>
      <el-option
        v-for="item in datepickerTypesList"
        :key='item.value'
        :label='item.label'
        :value='item.value'>
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label='datepicker'>
    <datepicker :type="value"></datepicker>
  </el-form-item>
  
</el-form>

<script>
  data()
  {
    return {
      datepickerTypesList:[
        {value: 'date', label:'date'},
        {value: 'date-range', label:'date-range'},
        {value: 'week', label:'week'},
        {value: 'year', label:'year'},
        {value: 'year-range', label:'year-range'},
        {value: 'month', label:'month'},
        {value: 'month-range', label:'month'},
      ],
      value: ''
    }
  }
</script>

```

:::


