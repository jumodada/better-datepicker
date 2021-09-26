import { addWatch } from '../../../observer/watcher'
import { Sub } from '../../../types/observer'
import { concat } from '../../../utils/concat'
import Options from '../../../types/options'
import defaultOptions from '../../util/default-options'

const options = {
  key: ['options'],
  cb(val: Options) {
    this.page = this._type.replace('week', 'date')
    this.reference && (this.reference.placeholder = val.placeholder)
  },
}

const optionsChildren: Sub[] = Object.keys(defaultOptions()).map((opt) => {
  return {
    key: { name: 'options', childKey: [opt] },
    cb() {
      return () => {
        this.update?.()
      }
    },
  }
})

export function watchOptions(): void {
  addWatch(concat(optionsChildren, [options]))
}
