import { State } from '../../../../../types/store'
import { joinDate, getTenRange } from '../../../../../utils/date'
import { getStatus } from '../public'

export function updateMonth(
  this: State,
  name: 'start' | 'end' = 'start'
): void {
  this[name]._month.forEach((item, idx) => {
    item.date = joinDate(idx + 1, this[name].year)
    item.status = getStatus(this, item.date, idx)
  })
}

export function updateYear(this: State, name: 'start'): void {
  const range = getTenRange(this[name].year)
  this[name]._year.forEach((item, idx) => {
    item.date = joinDate(1, range[idx])
    const status = idx === 0 ? 'pre' : idx === 11 ? 'next' : ''
    item.status = getStatus(this, item.date, idx, 'year', status)
  })
}
