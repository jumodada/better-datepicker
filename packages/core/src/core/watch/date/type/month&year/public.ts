import { DateData } from '../../../../../types/store'
import { joinDate, getTenRange } from '../../../../../utils/date'
import { getStatus } from '../public'

export function updateMonth(year: number, date: string, state: DateData): void {
  state._month.forEach((item, idx) => {
    item.date = joinDate(idx + 1, year)
    item.status = getStatus(this, item.date, idx)
  })
}

export function updateYear(year: number, date: string, state: DateData): void {
  const range = getTenRange(year)
  state._year.forEach((item, idx) => {
    item.date = joinDate(1, range[idx])
    const status = idx === 0 ? 'pre' : idx === 11 ? 'next' : ''
    item.status = getStatus(this, item.date, idx, 'year', status)
  })
}
