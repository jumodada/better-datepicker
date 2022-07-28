import { CellsData, RangeType, State } from '../types/store'
import { getRangeModeListener } from '../method'
import { CreateElementRequiredOptions } from '../types/utils'
import map from '../utils/for'
import { getWeekArray, isInRange, isSame } from '../utils/date'
import { DateCellListener } from '../types/components'
import { classNames } from '../utils/attribute'
import { isElementShow } from '../utils/element'

const rowsCount = 6
const colsCount = 7

export function Day(
  state: State,
  type: keyof RangeType = 'start'
): CreateElementRequiredOptions {
  function dateCellListener(childState: CellsData): DateCellListener {
    function dateWeek() {
      state.start.date = childState.date
      state.visible = false
    }

    return {
      date: dateWeek,
      'date-range': getRangeModeListener(childState),
      'date-week': dateWeek,
    }
  }

  function tBody(): CreateElementRequiredOptions {
    const tr = (): CreateElementRequiredOptions[] => {
      return map((rc) => {
        return {
          name: 'tr',
          children: td(rc),
        }
      }, rowsCount)
    }

    const td = (rc: number): CreateElementRequiredOptions[] => {
      return map((cc) => {
        const idx = rc * colsCount + cc
        const child = state[type]._date[idx]
        const { hoverSelected } = state
        const isInCurrentRange = () =>
          child.status !== 'pre' && child.status !== 'next' && state.isRange

        return {
          name: 'td',
          children: [
            {
              text: () => {
                return String(child.date.day)
              },
            },
          ],
          class: classNames('cell', {
            today: () => {
              return isSame(state.today, child.date)
            },
            pre: () => child.status === 'pre',
            next: () => child.status === 'next',
            selected: () =>
              !isInCurrentRange() && isSame(child.date, state.start.date),
            selecting: () => isInCurrentRange() && child.status === 'selected',
            inRange: () =>
              isInCurrentRange() && isInRange(child.date, hoverSelected.range),
            'range-start': () =>
              isInCurrentRange() && isSame(child.date, hoverSelected.range[0]),
            'range-end': () =>
              isInCurrentRange() && isSame(child.date, hoverSelected.range[1]),
          }),
          event: dateCellListener(child)[state.type as 'date'],
        }
      }, colsCount)
    }

    return {
      children: tr(),
      name: 'tbody',
    }
  }

  function bar(): CreateElementRequiredOptions {
    const { weekStart, weekdays } = state.locale
    return {
      name: 'thead',
      children: getWeekArray<string>(weekdays, weekStart).map((name) => {
        return { text: name, name: 'th' }
      }),
    }
  }

  return {
    class: classNames('date'),
    children: [
      {
        name: 'table',
        children: [bar, tBody],
        class: classNames('date'),
      },
    ],
    style: {
      display: () => isElementShow(state.mode === 'date'),
    },
  }
}
