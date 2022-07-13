import { appendChild } from '../utils/element'
import { updatePicker } from '../picker/update-picker'
import { getDate, isAfter } from '../utils/date'
import { getFormatDate } from '../utils/format'
import { useEffect } from '../reactive/effect'
import { extend } from '../utils/extend'
import { has } from '../utils/typeOf'

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

const hoverSelectRange = useEffect(
  function (start, end) {
    const range = [start, end]
    this.hoverSelected.range = isAfter(start, end) ? range.reverse() : range
  },
  ['hoverSelected.start', 'hoverSelected.end']
)

const hoverSelectedDate = useEffect(
  function (status) {
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
    if (has(type, 'week')) {
      this.format = this.locale.weekFormat
    }
  },
  ['type']
)

const initial = useEffect(
  function stat(type) {
    const types = type.split('-')
    const [mode] = types
    this.mode = mode
    this.isRange = types.includes('range')
    this.reference && (this.reference.placeholder = this.placeholder)
    if (has(type, 'week')) {
      this.format = this.locale.weekFormat
    }
  },
  ['type']
)

export default [
  initial,
  appendPopover,
  updatePicker,
  dispatchDateChange,
  hoverSelectRange,
  hoverSelectedDate,
  restartPicker,
]
