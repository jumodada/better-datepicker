import { CellsData, LocaleConfig, State } from '../types/store'
import map from './for'
import { WeekRange } from '../types/utils'
import { GetDateType } from '../types/core'

const msOfADay = 86400000

const defaultWeeks = [0, 1, 2, 3, 4, 5, 6]

export function objectToDate(date: null): null
export function objectToDate(date: CellsData['date']): Date
export function objectToDate(date: CellsData['date'] | null): Date | null
export function objectToDate(date: CellsData['date'] | null): Date | null {
  if (!date) return null
  const { year, month, day } = date
  return new Date(year, month - 1, day)
}

export function dateToObject(date: Date = new Date()): CellsData['date'] {
  return getDateObject(getYear(date), getMonth(date), getDay(date))
}

export function dateToTimestamp(date: CellsData['date']): number {
  return Date.parse(String(objectToDate(date)))
}

export function getDateFromState(state: State): GetDateType {
  const [startDate, endDate] = [
    objectToDate(state.start.date),
    objectToDate(state.end.date),
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
  return new Date(year, month - 1, 0).getDate()
}

export function getTenYearTimeRange(year: number): number[] {
  return map((idx) => year + idx - 1 - Number(year.toString().slice(-1)), 12)
}

export function monthStartDay(year: number, month: number, start = 0): number {
  let firstDate = new Date(year, month - 1, 1).getDay()
  if (firstDate === 0) firstDate = 7
  return firstDate - start
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

export function isAfter(
  source?: CellsData['date'] | null,
  target?: CellsData['date'] | null
): boolean {
  if (!source || !target) return false
  return dateToTimestamp(source) > dateToTimestamp(target)
}

export function isSame(
  source?: CellsData['date'] | null,
  target?: CellsData['date'] | null
): boolean {
  if (!source || !target) return false
  return dateToTimestamp(source) === dateToTimestamp(target)
}

export function isInRange<T = number>(
  date: CellsData['date'],
  [rangeStart, rangeEnd]: CellsData['date'][]
): boolean {
  return isAfter(rangeEnd, date) && isAfter(date, rangeStart)
}

export function getDateOfPreMonth<T = number>(
  year: number,
  month = 1,
  day = 1
): CellsData['date'] {
  const date = objectToDate({ year, month, day })
  date.setMonth(date.getMonth() - 1)
  return dateToObject(date)
}

export function getDateOfNextMonth(
  year: number,
  month = 1,
  day = 1
): CellsData['date'] {
  const date = objectToDate({ year, month, day })
  date.setMonth(date.getMonth() + 1)
  return dateToObject(date)
}

export function isDisabledDate(state: State, date: string): string {
  const { disabledDate } = state
  return disabledDate && disabledDate(new Date(date)) ? 'disabled' : ''
}

export function getWeeks(date: Date, locale: LocaleConfig): number {
  // const { year, month, day } = dateToObject(date)
  // const { yearStart, weekStart } = locale
  // const { start, end } = getWeekRange(date, weekStart)
  // if (month === 12 && day > 25) {
  //   const nextYearStartDay = new Date(year + 1, 0, yearStart)
  //   if (isAfter(end, nextYearStartDay)) return 1
  // }
  // const YearEnd = new Date(year, month - 1, day)
  // const YearStart = new Date(year, 0, yearStart)
  // const days = Math.round((YearEnd.valueOf() - YearStart.valueOf()) / msInADay)
  // const diff = (days + (YearStart.getDay() + 1 - 1)) / 7
  // if (diff <= 0) {
  //   return getWeeks(start, locale)
  // }
  // return Math.ceil(diff)
  return 1
}

export function getWeekArray<S = number>(
  weekdays: S[],
  weekStart: number
): S[] {
  return weekdays
    .slice(weekStart, weekdays.length)
    .concat(weekdays.slice(0, weekStart))
}

export function getWeekRange(date: Date, weekStart: number): WeekRange {
  const weeks = getWeekArray(defaultWeeks, weekStart)
  const startDiff = weeks.findIndex((week) => week === date.getDay())
  const endDiff = 6 - startDiff
  const getRange = (distance: number) =>
    new Date(Date.parse(date.toString()) + distance)
  return [
    dateToObject(getRange(-msOfADay * startDiff)),
    dateToObject(getRange(msOfADay * endDiff)),
  ]
}
