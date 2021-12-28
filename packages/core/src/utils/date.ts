import { CellsData, State } from '../types/store'
import { isObject } from './typeOf'
import map from './for'
import { LocaleConfig } from '../types/store'
import { WeekRange } from '../types/utils'
import { GetDateType } from '../types/core'

const msInADay = 86400000

const defaultWeeks = [0, 1, 2, 3, 4, 5, 6]

export function transformObjectToDate(date: CellsData['date']): Date {
  return new Date(joinDate(date))
}

export function transformDateToObject(
  date: Date = new Date()
): CellsData['date'] {
  return getDateObject(getYear(date), getMonth(date), getDay(date))
}

export function transformDateToNumber(date: CellsData['date']): number {
  return Date.parse(joinDate(date))
}

export function getDate(state: State): GetDateType {
  const [startDate, endDate] = [
    transformObjectToDate(state.start.date),
    transformObjectToDate(state.end.date),
  ]
  if (state.isRange) {
    return [startDate, endDate]
  } else {
    return startDate
  }
}

export function getYear(date: Date = new Date()): number {
  return date.getFullYear()
}

export function getMonth(date: Date = new Date()): number {
  return date.getMonth() + 1
}

export function getDay(date: Date = new Date()): number {
  return date.getDate()
}

export function daysInMonth({
  year,
  month,
}: {
  year: number
  month: number
}): number {
  return new Date(year, month, 0).getDate()
}

export function getTenYearTimeRange(year: number): number[] {
  return map((idx) => year + idx - 1 - Number(year.toString().slice(-1)), 12)
}

export function monthStartDay(year: number, month: number, start = 0): number {
  let firstDate = new Date(`${year}/${month}/01`).getDay()
  if (firstDate === 0) firstDate = 7
  return firstDate - start
}

export function joinDate(date: CellsData['date']): string {
  return Object.values(date).join('/')
}

export function getDateObject(
  year: number,
  month = 1,
  day = 1
): CellsData['date'] {
  return {
    year,
    month,
    day,
  }
}

export function isLaterTime(
  source: CellsData['date'],
  target: CellsData['date']
): boolean {
  return transformDateToNumber(source) > transformDateToNumber(target)
}

export function isSame(
  source: CellsData['date'],
  target: CellsData['date']
): boolean {
  return transformDateToNumber(source) === transformDateToNumber(target)
}

export function rangeSort(
  min: CellsData['date'],
  max: CellsData['date']
): CellsData['date'][] {
  const range = [min, max]
  return isLaterTime(min, max) ? range : range.reverse()
}

export function isInRange<T = number>(
  max: CellsData['date'],
  min: CellsData['date'],
  date: CellsData['date']
): string {
  return isLaterTime(max, date) && isLaterTime(date, min) ? 'in-range' : ''
}

export function getDateOfPreMonth<T = number>(
  date: number | CellsData['date'],
  month = 1,
  day = 1
): CellsData['date'] {
  if (isObject(date)) {
    const { year, month, day } = date
    return getDateOfPreMonth(year, month, day)
  }
  let preMonth = --month
  if (preMonth === 0) {
    preMonth = 12
    --date
  }
  return getDateObject(date, preMonth, day)
}

export function getDateOfNextMonth(
  date: number | CellsData['date'],
  month = 1,
  day = 1
): CellsData['date'] {
  if (isObject(date)) {
    const { year, month, day } = date
    return getDateOfNextMonth(year, month, day)
  }
  let nextMonth = ++month
  if (nextMonth === 13) {
    nextMonth = 1
    ++date
  }
  return getDateObject(date, nextMonth, day)
}

export function isDisabledDate(state: State, date: string): string {
  const { disabledDate } = state
  return disabledDate && disabledDate(new Date(date)) ? 'disabled' : ''
}

export function getYearWeek(date: Date, locale: LocaleConfig): number {
  // const { year, month, day } = transformDateToObject(date)
  // const { yearStart, weekStart } = locale
  // const { start, end } = getWeekRange(date, weekStart)
  // if (month === 12 && day > 25) {
  //   const nextYearStartDay = new Date(year + 1, 0, yearStart)
  //   if (isLaterTime(end, nextYearStartDay)) return 1
  // }
  // const YearEnd = new Date(year, month - 1, day)
  // const YearStart = new Date(year, 0, yearStart)
  // const days = Math.round((YearEnd.valueOf() - YearStart.valueOf()) / msInADay)
  // const diff = (days + (YearStart.getDay() + 1 - 1)) / 7
  // if (diff <= 0) {
  //   return getYearWeek(start, locale)
  // }
  // return Math.ceil(diff)
  return 1
}

export function getWeeks<S = number>(weekdays: S[], weekStart: number): S[] {
  return weekdays
    .slice(weekStart, weekdays.length)
    .concat(weekdays.slice(0, weekStart))
}

export function getWeekRange(date: Date, weekStart: number): WeekRange {
  // const weeks = getWeeks(defaultWeeks, weekStart)
  // const startDiff = weeks.findIndex((week) => week === (d as Date).getDay())
  // const endDiff = 6 - startDiff
  return {
    end: {
      year: 2021,
      month: 10,
      day: 1,
    },
    start: {
      year: 2021,
      month: 11,
      day: 1,
    },
  }
}
