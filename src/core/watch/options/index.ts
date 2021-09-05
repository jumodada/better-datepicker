import { addWatch } from '../../../observer/watcher'
import { Sub } from '../../../types/observer'
import { concat } from '../../../utils/concat'

const options = {
  key: ['options'],
  cb() {
    this.page = this._type.replace('week', 'date')
  },
}

const optionsChildrenCb = {
  placeholder(val: string) {
    this.reference && (this.reference.placeholder = val)
  },
  type() {
    return () => this.update()
  },
  zIndex() {
    return () => this.update()
  },
}

const optionsChildren: Sub[] = Object.keys(optionsChildrenCb).map((opt) => {
  return {
    key: { name: 'options', childKey: [opt] },
    cb: optionsChildrenCb[opt as never],
  }
})

export function watchOptions(): void {
  addWatch(concat([options], optionsChildren))
}
