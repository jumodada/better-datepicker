import { Sub } from '../../../types/observer'
import { Bind } from '../../../utils/bind'
import { State } from '../../../types/store'
import { getTenRange, joinDate } from '../../../utils/date'
import { getStatus } from './public'

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
    item.status = getStatus(this, item.date, idx, 'year')
  })
}

export const watchYM = (type = true, name = 'start'): Sub => {
  return Bind(type ? updateMonth : updateYear, name)
}

export const LinkYear = (
  name: 'start' | 'end' = 'start',
  isTen = false
): Sub => {
  const spacing = isTen ? 10 : 1
  return function (): void {
    if (name === 'start') {
      this.end.year = this.start.year + spacing
    } else {
      this.start.year = this.end.year - spacing
    }
  }
}
