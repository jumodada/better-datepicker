import { App } from 'vue'
import Datepicker from './src/datepicker.vue'
import { VueComponent } from '../../type/utils'

Datepicker.install = (app: App): void => {
  app.component(Datepicker.name, Datepicker)
}

export default Datepicker as unknown as VueComponent
