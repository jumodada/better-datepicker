import { CellsData, getRangeStatus, State } from '../types/store'
import { RangeClickEvent } from '../types/components'
import { _EventListener } from '../types/utils'
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
        const { hoverSelected } = this
        const current = rangeClickEvent[hoverSelected.status as getRangeStatus]
        hoverSelected[current.plt] = state.date
        hoverSelected.status = current.status
      },
    },
    {
      name: 'mouseenter',
      handler() {
        const { hoverSelected } = this
        if (hoverSelected.status === 'selecting') {
          hoverSelected.end = state.date
        }
      },
    },
  ]
}

export function selectYM(state: CellsData, name: 'year' | 'month'): void {
  const { date } = state
  this.start[name] = date[name]
  this.start.date = date
  this.visible = false
}

export function dayMode(state: CellsData): void {
  console.log(state)
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

export function canIShow(state: State) {
  return () => isElementShow(state.mode === 'day')
}
