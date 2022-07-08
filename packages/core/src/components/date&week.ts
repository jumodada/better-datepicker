import { CellsData, RangeType, State } from '../types/store'
import { handleRange } from './public'
import { CreateElementRequiredOptions } from '../types/utils'
import map from '../utils/for'
import { getWeeks, isInRange, isSame } from '../utils/date'
import { DayEvent } from '../types/components'
import { classNames } from '../utils/attribute'
import { isElementShow } from '../utils/element'

const rowsCount = 6
const colsCount = 7

export function Day(
  state: State,
  type: keyof RangeType = 'start'
): CreateElementRequiredOptions {
  function dayEvent(childState: CellsData): DayEvent {
    function dateWeek() {
      state.start.date = childState.date
      state.visible = false
    }

    return {
      date: dateWeek,
      'date-range': handleRange(childState),
      week: dateWeek,
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
        const { hoverSelected, isRange } = state
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
            selected: () => !isRange && isSame(child.date, state.start.date),
            selecting: () => isRange && child.status === 'selected',
            inRange: () =>
              isRange && isInRange(child.date, hoverSelected.range),
            'range-start': () =>
              isRange && isSame(child.date, hoverSelected.range[0]),
            'range-end': () =>
              isRange && isSame(child.date, hoverSelected.range[1]),
          }),
          event: dayEvent(child)[state.type as 'date'],
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
      children: getWeeks<string>(weekdays, weekStart).map((name) => {
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
      display: () => isElementShow(state.mode === 'day'),
    },
  }
}
