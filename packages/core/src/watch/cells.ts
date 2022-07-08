import { CellsData, ComponentStatus, State } from '../types/store'
import {
  daysInMonth,
  getDateObject,
  getDateOfNextMonth,
  getDateOfPreMonth,
  getTenYearTimeRange,
  monthStartDay,
} from '../utils/date'
import { useEffect } from '../reactive/effect'

export const updateDayCell = useEffect(
  function stat(
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
  function stat(this: State, year: number, monthDCells: CellsData[]) {
    monthDCells.forEach((item, idx) => {
      item.date = getDateObject(year, idx + 1)
      //item.status = getStatus(this, item.date, idx)
    })
  },
  ['start.year', 'start._month'],
  ['end.year', 'end._month']
)

export const updateYearCell = useEffect(
  function stat(this: State, year, yearCells: CellsData[]): void {
    const range = getTenYearTimeRange(year)
    yearCells.forEach((item, idx) => {
      item.date = getDateObject(range[idx])
      //item.status = getStatus(this, item.date, idx, 'year')
    })
  },
  ['start.year', 'start._year'],
  ['end.year', 'end._year']
)

export const panelLinkage = [
  useEffect(
    function stat(startMonth, startYear) {
      const { month, year } = getDateOfNextMonth(startYear, startMonth)
      ;[this.end.month, this.end.year] = [month, year]
    },
    ['start.month', 'start.year']
  ),
  useEffect(
    function stat(endMonth, endYear) {
      const { month, year } = getDateOfPreMonth(endYear, endMonth)
      ;[this.start.month, this.start.year] = [month, year]
    },
    ['end.month', 'end.year']
  ),
]
