import { addWatch } from '../../../observer/watcher'
import { Sub } from '../../../types/observer'
import { concat } from '../../../utils/concat'
import defaultOptions from '../../util/default-options'
import { objectKeys } from '../../../utils/objectKeys'

function options() {
  this.page = this._type.replace('week', 'date')
  this.reference && (this.reference.placeholder = this.options.placeholder)
}

const optionsChildren: Sub[] = objectKeys(defaultOptions()).map((opt) => {
  return function () {
    this.options[opt]?.valueOf()
    return () => {
      this.update?.()
    }
  }
})

export function watchOptions(): void {
  addWatch(concat([options], optionsChildren))
}
