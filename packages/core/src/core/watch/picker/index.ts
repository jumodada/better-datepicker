import { addWatch } from '../../../observer/watcher'
import { appendChild } from '../../../utils/element'
import { updatePopover } from '../../dom/updatePopover'

function appendPopover(): void {
  if (this.popover === null) return
  const { insertTo } = this.options
  appendChild(
    this.popover,
    insertTo === 'body'
      ? undefined
      : (this.reference?.parentNode as HTMLElement)
  )
}

export function watchComponents(): void {
  addWatch([appendPopover, updatePopover])
}
