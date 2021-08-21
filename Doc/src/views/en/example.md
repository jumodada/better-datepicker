Examples

## Type

::: 默认值是*date*, 单位是[**日**]

```html

<el-form>
  <el-form-item label='Props'>
    <Input width='20vw' id='dateInput'>
  </el-form-item>
  <el-form-item label='Props'>
  <el-select value='1' v-model='value' placeholder='请选择'>
    <el-option
      v-for="item in [{value:1,label:'xx'}]"
      :key='item.value'
      :label='item.label'
      :value='item.value'>
    </el-option>
  </el-select>
  </el-form-item>
</el-form>

<script>
  data(){
    return {
      value: ''
    }
  },
  mounted(){
    const input = document.querySelector('#dateInput')
    const picker = this.createDatePicker(input)
  }
</script>

```

:::


