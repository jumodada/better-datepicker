import { State, RangeType, DateComponents } from '../../../types/store'
import { canIShow, isDayPage } from '../utils'
import { CreateElementPartOptions, updateOptions } from '../../../types/utils'
import { dayEvent } from './event'
import _for from '../../../utils/for'
import { getWeeks } from '../../../utils/date'

let type: keyof RangeType = 'start'
const rowsCount = 6
const colsCount = 7

function cellOptionsGenerator(
  child: DateComponents,
  name: 'text' | 'status' = 'status'
): updateOptions {
  return {
    key: {
      name: [name],
      child,
    },
    cb: (val: string) => val,
    static: ['cell'],
  }
}

function tBody(state: State): CreateElementPartOptions {
  function tr(): CreateElementPartOptions[] {
    return _for((rc) => {
      return {
        name: 'tr',
        children: td(rc),
      }
    }, rowsCount)
  }

  function td(rc: number): CreateElementPartOptions[] {
    return _for((cc) => {
      const idx = rc * 7 + cc
      const child = state[type]._date[idx]
      return {
        name: 'td',
        children: [
          {
            text: cellOptionsGenerator(child, 'text'),
          },
        ],
        class: cellOptionsGenerator(child),
        event: {
          listener: dayEvent(child)[state.options.type as 'date'],
          arg: child,
        },
      }
    }, colsCount)
  }

  return {
    children: tr(),
    name: 'tbody',
  }
}

function bar(state: State): CreateElementPartOptions {
  const offset = state.locale.weekStart
  const { weekdays } = state.locale
  return {
    name: 'thead',
    children: getWeeks<string>(weekdays, offset).map((name) => {
      return { text: name, name: 'th' }
    }),
  }
}

export function Day(
  state: State,
  t: keyof RangeType = 'start'
): CreateElementPartOptions {
  type = t
  const classes = ['date']
  if (state.options.type === 'week') classes.push('week')
  return {
    name: 'table',
    children: [bar, tBody],
    class: classes,
    $style: canIShow(isDayPage),
  }
}

export function endDay(state: State): CreateElementPartOptions {
  return Day(state, 'end')
}
