import { addWatch } from '../../../observer/watcher'

function options() {
  this.page = this.type.replace('week', 'date')
  this.reference && (this.reference.placeholder = this.placeholder)
}

export function watchOptions(): void {
  addWatch([options])
}
