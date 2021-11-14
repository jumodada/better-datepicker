import { ComponentStatus, State } from '../../../../../types/store'
import {
  daysInAMonth,
  getNext,
  getPre,
  joinDate,
  monthStartDay,
} from '../../../../../utils/date'
import { getStatus } from '../public'

export function updateDays(this: State): void {
  const { month, year, _date } = this.start
  const [preMonth, preYear] = getPre(month, year)
  const preDays = daysInAMonth(preYear, preMonth)
  const [fd, days] = [
    monthStartDay(year, month, this.locale.weekStart),
    daysInAMonth(year, month),
  ]
  _date.forEach((item, index) => {
    const idx = index + 1
    const currentIdx = idx - fd
    const status: ComponentStatus =
      index < fd ? 'pre' : fd + days <= index ? 'next' : ''
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
    item.status = getStatus(this, item.date, idx, this.type, status)
  })
}
