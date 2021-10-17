EXAMPLE-OPTIONS

## Placeholder

::: 

```html

<el-form label-position="top">
  <el-form-item label='props'>
    <el-input :placeholder='value' v-model='value' />
  </el-form-item>
  <el-form-item label='datepicker'>
    <datepicker :placeholder="value"></datepicker>
  </el-form-item>

</el-form>

<script>
  data(){
    return {
      value: 'To set placeholder'
    }
  }
</script>

```

:::


