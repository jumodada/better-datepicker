import { App } from 'vue'
import ColorPicker from 'element-plus/lib/el-color-picker'
import ElForm from 'element-plus/lib/el-form'
import ElFormItem from 'element-plus/lib/el-form-item'
import Msg from 'element-plus/lib/el-message'
import Select from 'element-plus/lib/el-select'
import Option from 'element-plus/lib/el-option'
import Input from 'element-plus/lib/el-input'

export function useElementComponent(app: App): void {
  app.use(ColorPicker)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(Msg)
  app.use(Select)
  app.use(Option)
  app.use(Input)
  app.config.globalProperties.$Msg = Msg
}
