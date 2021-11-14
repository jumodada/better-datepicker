import { addWatch } from '../../../observer/watcher'
import { appendChild } from '../../../utils/element'
import { updatePopover } from '../../dom/updatePopover'
import { findInputElement } from '../../../utils/findInputElement'

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

function xx() {
  const { reference } = this
  if (reference && !(reference instanceof HTMLInputElement)) {
    this.reference = findInputElement(reference)
  }
}

export function watchComponents(): void {
  addWatch([appendPopover, updatePopover, xx])
}
