import { ComponentStatus, DateData, State } from '../../../../types/store'
import {
  isAfter,
  transformDateToArray,
  rangeSort,
  isDisabledDate,
  isSame,
  getWeekRange,
} from '../../../../utils/date'
import { Sub } from '../../../../types/observer'
import { dispatchDateChange, getDate } from '../../../util/method'
import { mergeClasses } from '../../../../utils/merge'
import { DateComponentsType } from '../../../../types/components'
import { has, not } from '../../../../utils/typeOf'
import { GetStatusFunctionsType } from '../../../../types/core'

export function rangeStatus(date: string): ComponentStatus {
  const { start, end } = this.range
  const [max, min] = rangeSort(start, end)
  const isMin = date === min
  const isMax = date === max
  const isInRange = isAfter(max, date) && isAfter(date, min)
  const st = 'range-start'
  const et = 'range-end'
  if (isInRange) return 'inRange'
  if (isMax && isMin) {
    return mergeClasses(st, et) as ComponentStatus
  } else if (isMin) {
    return st
  } else if (isMax) {
    return et
  } else {
    return ''
  }
}

export function monthStatus(date: string): ComponentStatus {
  return isSame(this.start.date, date) ? 'selected' : ''
}

export function yearStatus(date: string, idx: number): ComponentStatus {
  return idx === 0
    ? 'pre'
    : idx === 11
    ? 'next'
    : isSame(this.start.date, date, 1)
    ? 'selected'
    : ''
}

export function dateStatus(date: string): ComponentStatus {
  return this.start.date === date ? 'selected' : ''
}

export function weekStatus(curDate: Date): ComponentStatus {
  const { date } = this.start
  if (!date) return ''
  const { start, end } = getWeekRange(this.start.date, this.locale.weekStart)
  if (isSame(curDate, start, 3)) return 'weekStart'
  if (isSame(curDate, end, 3)) return 'weekEnd'
  return isAfter(curDate, start) && isAfter(end, curDate) ? 'inRangeWeek' : ''
}

export function startDate(): void {
  const { date } = this.start
  if (!date) return
  const { start } = this
  ;[start.year, start.month] = transformDateToArray(date)
  this.date = getDate(this)
}

export function endDate(): void {
  if (!this.end.date) return
  this.date = getDate(this)
}

export function handleSelecting(this: State): void {
  if (this.range.status === 'selecting') {
    this.range.end = null
  } else {
    finishSelect(this)
  }
}

export function startMonthAndYear(this: State): void {
  const { year, month } = this.start
  this.start._month.forEach((item, idx) => {
    item.status = month === idx + 1 ? 'selected' : ''
  })
  this.start._year.forEach((item, idx) => {
    const [itemYear] = transformDateToArray(item.date)
    item.status =
      idx === 0
        ? 'pre'
        : idx === 11
        ? 'next'
        : year === itemYear
        ? 'selected'
        : ''
  })
}

export function hoverSelect(type: keyof DateComponentsType = 'month'): Sub {
  return function () {
    ;(['start', 'end'] as const).forEach((name) => {
      this[name][('_' + type) as '_month']
        .filter((item) => not(item.status, ['pre', 'next']))
        .forEach(
          (item, idx) => (item.status = getStatus(this, item.date, idx, type))
        )
    })
  }
}

export function getStatus(
  self: State,
  date: string,
  idx: number,
  type: keyof DateComponentsType = 'month',
  preStatus = ''
): ComponentStatus {
  const typeStatus: GetStatusFunctionsType = {
    year: yearStatus,
    month: monthStatus,
    date: dateStatus,
    week: weekStatus,
  }

  function isToday() {
    return Date.parse(self.today) === Date.parse(date) ? 'today' : ''
  }

  const method = has(self.options.type, 'range')
    ? rangeStatus
    : typeStatus[type]
  return mergeClasses(
    method?.call(self, date, idx),
    isDisabledDate(self, date),
    isToday(),
    preStatus
  ) as ''
}

function finishSelect(self: State) {
  self.visible = false
  const { start, end } = self.range
  ;[self.end.date, self.start.date] = rangeSort(start, end)
}
