import { appendChild } from '../utils/element'
import { findInputElement } from '../utils/findInputElement'
import { updatePicker } from '../picker/update-picker'
import { getDate } from '../utils/date'
import { getFormatDate } from '../utils/format'

function options(): void {
  // this.mode = this.type.replace('week', 'day')
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

function dispatchDateChange(): void {
  const date = getDate(this)
  this.onChange?.(date)
  if (this.binding && this.reference) {
    this.reference.value = getFormatDate.call(this, date, this.format)
  }
}

function findReference(): void {
  const { reference } = this
  if (reference && !(reference instanceof HTMLInputElement)) {
    this.reference = findInputElement(reference)
  }
}

export default [
  options,
  appendPopover,
  updatePicker,
  findReference,
  dispatchDateChange,
]