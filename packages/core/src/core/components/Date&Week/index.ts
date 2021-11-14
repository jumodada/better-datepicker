import { RangeType } from '../../../types/store'
import { canIShow, isDayPage } from '../utils'
import { CreateElementRequiredOptions } from '../../../types/utils'
import { dayEvent } from './event'
import _for from '../../../utils/for'
import { getWeeks } from '../../../utils/date'

let type: keyof RangeType = 'start'
const rowsCount = 6
const colsCount = 7

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
      const child = this[type]._date[idx]
      return {
        name: 'td',
        children: [
          {
            text: () => child['text'],
          },
        ],
        class: {
          cb: () => child['status'],
          static: ['cell'],
        },
        event: dayEvent(child)[this.type as 'date'],
      }
    }, colsCount)
  }

  return {
    children: tr(),
    name: 'tbody',
  }
}

function bar(): CreateElementRequiredOptions {
  const offset = this.locale.weekStart
  const { weekdays } = this.locale
  return {
    name: 'thead',
    children: getWeeks<string>(weekdays, offset).map((name) => {
      return { text: name, name: 'th' }
    }),
  }
}

export function Day(
  t: keyof RangeType = 'start'
): CreateElementRequiredOptions {
  type = t
  const classes = ['date']
  if (this.type === 'week') classes.push('week')
  return {
    class: ['content'],
    children: [
      {
        name: 'table',
        children: [bar, tBody],
        class: classes,
      },
    ],
    $style: canIShow(isDayPage),
  }
}

export function endDay(): CreateElementRequiredOptions {
  return Day('end')
}
