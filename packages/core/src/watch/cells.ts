import { CellsData, ComponentStatus, State } from '../types/store'
import {
  daysInMonth,
  getDateObject,
  getDateOfNextMonth,
  getDateOfPreMonth,
  getTenYearTimeRange,
  joinDate,
  monthStartDay,
} from '../utils/date'
import { useEffect } from '../reactive/effect'

export const updateDayCell = useEffect(
  function (
    this: State,
    year: number,
    month: number,
    dateCells: CellsData[]
  ): void {
    const [fd, days] = [
      monthStartDay(year, month, this.locale.weekStart),
      daysInMonth({ year, month }),
    ]
    dateCells.forEach((item, index) => {
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

export const updateMonthCell = useEffect(
  function (this: State, year: number, monthDCells: CellsData[]) {
    monthDCells.forEach((item, idx) => {
      item.date = getDateObject(year, idx + 1)
      //item.status = getStatus(this, item.date, idx)
    })
  },
  ['start.year', 'start._month'],
  ['end.year', 'end._month']
)

export const updateYearCell = useEffect(
  function (this: State, year, yearCells: CellsData[]): void {
    const range = getTenYearTimeRange(year)
    yearCells.forEach((item, idx) => {
      item.date = getDateObject(range[idx])
      //item.status = getStatus(this, item.date, idx, 'year')
    })
  },
  ['start.year', 'start._year'],
  ['end.year', 'end._year']
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

// export const monthPanelLinkage = subscribe(
//   function (currentMonth: number, key: 'start.month' | 'end.month') {
//     console.log(key)
//     // const [parentKey] = key.split('.') as ('start' | 'end')[]
//     // const reverse: ReverseMap = {
//     //   start: 'end',
//     //   end: 'start',
//     // }
//     // const data = this[reverse[parentKey]]
//     // const method =
//     //   parentKey === 'start' ? getDateOfNextMonth : getDateOfPreMonth
//     // const { month, year } = method(this[parentKey].year, currentMonth)
//     // ;[data.month, data.year] = [month, year]
//   },
//   ['start.month'],
//   ['end.month']
// )
