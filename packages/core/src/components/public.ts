import { CellsData, getRangeStatus, RangeType, State } from '../types/store'
import { RangeClickEvent } from '../types/components'
import { _EventListener } from '../types/utils'
import { getDateOfNextMonth, getDateOfPreMonth } from '../utils/date'
import { isElementShow } from '../utils/element'

const rangeClickEvent: RangeClickEvent = {
  complete: {
    plt: 'start',
    status: 'selecting',
  },
  selecting: {
    plt: 'end',
    status: 'complete',
  },
}

export function handleRange(state: CellsData): _EventListener[] {
  return [
    {
      name: 'click',
      handler() {
        const { range } = this
        const current = rangeClickEvent[range.status as getRangeStatus]
        range[current.plt] = state.date
        range.status = current.status
      },
    },
    {
      name: 'mouseenter',
      handler() {
        const { range } = this
        if (range.status === 'selecting') {
          range.end = state.date
        }
      },
    },
  ]
}

export function nextYear(type: keyof RangeType): void {
  const num = this.mode === 'year' ? 10 : 1
  this[type].year += num
}

export function preYear(): void {
  const num = this.mode === 'year' ? 10 : 1
  this.start.year -= num
}

export function nextMonth(type: keyof RangeType): void {
  const child = this[type]
  const { month, year } = getDateOfNextMonth(child)
  child.month = month
}

export function preMonth(): void {
  const child = this.start
  const { month, year } = getDateOfPreMonth(child)
  ;[child.month, child.year] = [month, year]
}

export function selectYM(state: CellsData, name: 'year' | 'month'): void {
  const { date } = state
  this.start[name] = date[name]
  this.start.date = date
  this.visible = false
}

export function dayMode(state: CellsData): void {
  this.start.month = state.date.month
  this.mode = 'day'
}

export function yearMode(): void {
  this.mode = 'year'
}

export function monthMode(state: CellsData): void {
  const { date } = state
  if (date) this.start.year = date.year
  this.mode = 'month'
}

export function canIShow(state: State, name = 'day') {
  return () => isElementShow(state.mode === name)
}
