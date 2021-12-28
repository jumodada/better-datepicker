import { ComponentStatus, State } from '../types/store'
import {
  daysInMonth,
  getDateObject,
  getDateOfNextMonth,
  getDateOfPreMonth,
  getTenYearTimeRange,
  joinDate,
  monthStartDay,
} from '../utils/date'
import { getStatus } from './utils'
import { ReverseMap } from '../types/watch'
import { subscribe } from '../observer/watcher'

export const updateDayCell = subscribe(
  function (this: State, year, month, _date): void {
    const [fd, days] = [
      monthStartDay(year, month, this.locale.weekStart),
      daysInMonth({ year, month }),
    ]
    _date.forEach((item, index) => {
      const idx = index + 1
      const currentIdx = idx - fd
      const status: ComponentStatus =
        index < fd ? 'pre' : fd + days <= index ? 'next' : 'none'
      item.status = status
      const getCellDate = {
        pre() {
          const preMonthDays = daysInMonth(getDateOfPreMonth(year, month))
          const day = preMonthDays + currentIdx
          return getDateOfPreMonth(year, month, day)
        },
        next() {
          const day = currentIdx - days
          return getDateOfNextMonth(year, month, day)
        },
        none() {
          return getDateObject(year, month, currentIdx)
        },
      }
      item.date = getCellDate[status]()
    })
  },
  ['start.year', 'start.month', 'start._date'],
  ['end.year', 'end.month', 'end._date']
)

export const updateMonthCell = subscribe(
  function (this: State, _, name: 'start' | 'end' = 'start') {
    this[name]._month.forEach((item, idx) => {
      item.date = getDateObject(this[name].year, idx + 1)
      //item.status = getStatus(this, item.date, idx)
    })
  },
  ['start.year'],
  ['end.year']
)

export const updateYearCell = subscribe(
  function (this: State, _, name: 'start' | 'end' = 'start'): void {
    const range = getTenYearTimeRange(this[name].year)
    this[name]._year.forEach((item, idx) => {
      item.date = getDateObject(range[idx])
      // item.status = getStatus(this, item.date, idx, 'year')
    })
  },
  ['start.year', 'end.year']
)

export function yearPanelLinkage(this: State, _: string, name = 'start'): void {
  const timespan = this._type === 'year' ? 10 : 1
  const startYear = this.start.year
  const endYear = this.end.year
  if (name === 'start') {
    this.end.year = startYear + timespan
  } else {
    this.start.year = endYear - timespan
  }
}

export function monthPanelLinkage(
  _: string,
  name: 'start' | 'end' = 'start'
): void {
  const reverse: ReverseMap = {
    start: 'end',
    end: 'start',
  }
  if (name == null) {
    name = 'start'
    monthPanelLinkage.call(this, '', 'end')
  }
  const data = this[reverse[name]]
  const method = name === 'start' ? getDateOfNextMonth : getDateOfPreMonth
  const { month, year } = method(this[name].year, this[name].month)
  ;[data.month, data.year] = [month, year]
}
