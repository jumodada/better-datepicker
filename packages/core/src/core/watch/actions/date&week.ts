import {
  daysInMonth,
  getNext,
  getPre,
  joinDate,
  monthStartDay,
} from '../../../utils/date'
import { Sub } from '../../../types/observer'
import { ReverseMap } from '../../../types/watch'
import { ComponentStatus, State } from '../../../types/store'

export function linkMonth(name: 'start' | 'end' = 'start'): Sub {
  const reverse: ReverseMap = {
    start: 'end',
    end: 'start',
  }
  return function (): void {
    const data = this[reverse[name]]
    const method = name === 'start' ? getNext : getPre
    ;[data.month, data.year] = method(this[name].month, this[name].year)
  }
}

export function updateDays(this: State): void {
  const { month, year, _date } = this.start
  const [preMonth, preYear] = getPre(month, year)
  const preDays = daysInMonth(preYear, preMonth)
  const [fd, days] = [
    monthStartDay(year, month, this.locale.weekStart),
    daysInMonth(year, month),
  ]
  _date.forEach((item, index) => {
    const idx = index + 1
    const currentIdx = idx - fd
    const status: ComponentStatus =
      index < fd ? 'pre' : fd + days <= index ? 'next' : ''
    item.status = status
    const newDate = {
      pre() {
        const day = preDays + currentIdx
        return [String(day), joinDate(getPre(month, year), day)]
      },
      next() {
        const day = currentIdx - days
        return [String(day), joinDate(getNext(month, year), day)]
      },
      other() {
        const date = joinDate(month, year, currentIdx)
        return [String(currentIdx), date]
      },
    }
    ;[item.text, item.date] = newDate[status || 'other']()
  })
}
