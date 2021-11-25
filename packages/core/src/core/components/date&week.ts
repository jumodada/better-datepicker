import { DateComponents, RangeType, State } from '../../types/store'
import { handleRange } from './public'
import { CreateElementRequiredOptions } from '../../types/utils'
import _for from '../../utils/for'
import { getWeeks } from '../../utils/date'
import { DayEvent } from '../../types/components'
import { classNames } from '../../utils/attribute'
import { visible } from '../../utils/element'

const rowsCount = 6
const colsCount = 7

export function Day(
  state: State,
  type: keyof RangeType = 'start'
): CreateElementRequiredOptions {
  // const classes = ['date']
  // console.log(state.type)
  // if (state.type === 'week') classes.push('week')

  function dayEvent(childState: DateComponents): DayEvent {
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
      return _for((rc) => {
        return {
          name: 'tr',
          children: td(rc),
        }
      }, rowsCount)
    }

    const td = (rc: number): CreateElementRequiredOptions[] => {
      return _for((cc) => {
        const idx = rc * 7 + cc
        const child = state[type]._date[idx]
        return {
          name: 'td',
          children: [
            {
              text: () => child['text'],
            },
          ],
          class: classNames('cell', {
            today: () => Date.parse(state.today) === Date.parse(child.date),
            pre: () => child.status === 'pre',
            next: () => child.status === 'next',
          }),
          //todo 这里需要一个泛型
          event: dayEvent(child)[state._type as 'date'],
        }
      }, colsCount)
    }

    return {
      children: tr(),
      name: 'tbody',
    }
  }

  function bar(): CreateElementRequiredOptions {
    const offset = state.locale.weekStart
    const { weekdays } = state.locale
    return {
      name: 'thead',
      children: getWeeks<string>(weekdays, offset).map((name) => {
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
      display: () => visible(state.page === 'date'),
    },
  }
}
