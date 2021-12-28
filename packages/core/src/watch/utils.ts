import { ComponentStatus, PickersMap, State } from '../types/store'
import {
  isLaterTime,
  isDisabledDate,
  isSame,
  getWeekRange,
} from '../utils/date'
import { mergeClasses } from '../utils/merge'
import { has } from '../utils/typeOf'
import { GetStatusFunctionsType } from '../types/core'

function getRangeStatus(date: string): ComponentStatus {
  // const { start, end } = this.range
  // const [max, min] = rangeSort(start, end)
  // const isMin = date === min
  // const isMax = date === max
  // const isInRange = isLaterTime(max, date) && isLaterTime(date, min)
  // const st = 'range-start'
  // const et = 'range-end'
  // if (isInRange) return 'inRange'
  // if (isMax && isMin) {
  //   return mergeClasses(st, et) as ComponentStatus
  // } else if (isMin) {
  //   return st
  // } else if (isMax) {
  //   return et
  // } else {
  //   return ''
  // }
  return 'none'
}

function getMonthStatus(date: string): ComponentStatus {
  return isSame(this.start.date, date) ? 'selected' : 'none'
}

function getYearStatus(date: string, idx: number): ComponentStatus {
  return idx === 0
    ? 'pre'
    : idx === 11
    ? 'next'
    : isSame(this.start.date, date, 1)
    ? 'selected'
    : 'none'
}

function getDateStatus(date: string): ComponentStatus {
  return this.start.date === date ? 'selected' : 'none'
}

function getWeekStatus(curDate: Date): ComponentStatus {
  const { date } = this.start
  if (!date) return 'none'
  const { start, end } = getWeekRange(this.start.date, this.locale.weekStart)
  if (isSame(curDate, start, 3)) return 'weekStart'
  if (isSame(curDate, end, 3)) return 'weekEnd'
  return isLaterTime(curDate, start) && isLaterTime(end, curDate)
    ? 'inRangeWeek'
    : 'none'
}

export function startMonthAndYear(this: State): void {
  const { year, month } = this.start
  this.start._month.forEach((item, idx) => {
    item.status = month === idx + 1 ? 'selected' : 'none'
  })
  this.start._year.forEach((item, idx) => {
    const cellYear = item.date.year
    item.status =
      idx === 0
        ? 'pre'
        : idx === 11
        ? 'next'
        : year === cellYear
        ? 'selected'
        : 'none'
  })
}

export function getStatus(
  self: State,
  date: string,
  idx: number,
  type: keyof PickersMap = 'month'
): ComponentStatus {
  const typeStatus: GetStatusFunctionsType = {
    year: getYearStatus,
    month: getMonthStatus,
    date: getDateStatus,
    week: getWeekStatus,
  }

  const method = has(self.type, 'range')
    ? getRangeStatus
    : typeStatus[type as 'date']
  return mergeClasses(
    method?.call(self, date, idx),
    isDisabledDate(self, date)
  ) as 'none'
}
