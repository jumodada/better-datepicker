import { addWatch } from '../../observer/watcher'
import { appendChild } from '../../utils/element'
import { findInputElement } from '../../utils/findInputElement'
import { updatePopover } from '../dom/updatePopover'

function options() {
  this.page = this.type.replace('week', 'date')
  this.reference && (this.reference.placeholder = this.placeholder)
}

function appendPopover(): void {
  if (this.popover === null) return
  const { insertTo } = this
  appendChild(
    this.popover,
    insertTo === 'body'
      ? undefined
      : (this.reference?.parentNode as HTMLElement)
  )
}

function findReference() {
  const { reference } = this
  if (reference && !(reference instanceof HTMLInputElement)) {
    this.reference = findInputElement(reference)
  }
}

export function init(): void {
  addWatch([options, appendPopover, updatePopover, findReference])
}
