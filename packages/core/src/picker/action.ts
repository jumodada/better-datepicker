import { CellsData, getRangeStatus, State } from '../_types/store'
import { RangeClickEvent } from '../_types/components'
import { _EventListener } from '../_types/utils'
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

export function getRangeModeListener(state: CellsData): _EventListener[] {
  return [
    {
      name: 'click',
      handler() {
        const { hoverSelected } = this
        const current = rangeClickEvent[hoverSelected.status as getRangeStatus]
        hoverSelected[current.plt] = state.date
        hoverSelected.status = current.status
        ;[this.start.date, this.end.date] = hoverSelected.range
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

export function selectYearOrMonth(
  state: CellsData,
  name: 'year' | 'month'
): void {
  const { date } = state
  this.start[name] = date[name]
  this.start.date = date
  this.visible = false
}

export function toggleToDayMode(state: CellsData): void {
  this.start.month = state.date.month
  this.mode = 'date'
}

export function toggleYearMode(): void {
  this.mode = 'year'
}

export function toggleMonthMode(state: CellsData): void {
  const { date } = state
  if (date) this.start.year = date.year
  this.mode = 'month'
}

export function isShow(state: State) {
  return () => isElementShow(state.mode === 'date')
}
