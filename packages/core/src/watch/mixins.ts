import { appendChild } from '../utils/element'
import { findInputElement } from '../utils/findInputElement'
import { updatePicker } from '../picker/update-picker'
import { getDate, isAfter } from '../utils/date'
import { getFormatDate } from '../utils/format'
import { useEffect } from '../reactive/effect'
import { extend } from '../utils/extend'

function options(): void {
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

const hoverSelectRange = useEffect(
  function (start, end) {
    const range = [start, end]
    this.hoverSelected.range = isAfter(start, end) ? range.reverse() : range
  },
  ['hoverSelected.start', 'hoverSelected.end']
)

const hoverSelectedDate = useEffect(
  function (status) {
    console.log(this)
    const [start, end] = this.hoverSelected.range
    if (status === 'complete') {
      this.start.date = start
      this.end.date = end
      this.visible = false
    }
  },
  ['hoverSelected.status']
)

const restartPicker = useEffect(
  function (type) {
    this.destroyed()
    this.create(extend(this, { type }))
  },
  ['type']
)

export default [
  options,
  appendPopover,
  updatePicker,
  findReference,
  dispatchDateChange,
  hoverSelectRange,
  hoverSelectedDate,
  restartPicker,
]
