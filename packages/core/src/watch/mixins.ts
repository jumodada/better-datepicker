import { appendChild } from '../utils/element'
import { updatePicker } from '../picker/update-picker'
import { getDate, isAfter } from '../utils/date'
import { getFormatDate } from '../utils/format'
import { useEffect } from '../reactive/effect'
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
  function () {
    this.destroyed()
    this.create(this)
  },
  ['type', 'reference']
)

const initial = useEffect(
  function stat(type) {
    const types = type.split('-')
    const [mode] = types
    this.mode = mode
    this.isRange = types.includes('range')
    this.isWeek = has(type, 'week')
    this.reference && (this.reference.placeholder = this.placeholder)

    //todo 抽离这段逻辑到 week 专属的监听部分
    if (this.isWeek) {
      this.format = this.locale.weekFormat
    }
  },
  ['type']
)

export default [
  initial,
  restartPicker,
  appendPopover,
  updatePicker,
  dispatchDateChange,
  hoverSelectRange,
  hoverSelectedDate,
]
