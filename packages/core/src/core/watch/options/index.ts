import { addWatch } from '../../../observer/watcher'

function options() {
  this.page = this._type.replace('week', 'date')
  this.reference && (this.reference.placeholder = this.options.placeholder)
}

export function watchOptions(): void {
  addWatch([options])
}
