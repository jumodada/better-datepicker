import { RangeType } from '../../../types/store'
import { canIShow, isDayPage } from '../utils'
import { CreateElementPartOptions } from '../../../types/utils'
import { dayEvent } from './event'
import _for from '../../../utils/for'
import { getWeeks } from '../../../utils/date'

let type: keyof RangeType = 'start'
const rowsCount = 6
const colsCount = 7

function tBody(): CreateElementPartOptions {
  const tr = (): CreateElementPartOptions[] => {
    return _for((rc) => {
      return {
        name: 'tr',
        children: td(rc),
      }
    }, rowsCount)
  }

  const td = (rc: number): CreateElementPartOptions[] => {
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
        event: dayEvent(child)[this.options.type as 'date'],
      }
    }, colsCount)
  }

  return {
    children: tr(),
    name: 'tbody',
  }
}

function bar(): CreateElementPartOptions {
  const offset = this.locale.weekStart
  const { weekdays } = this.locale
  return {
    name: 'thead',
    children: getWeeks<string>(weekdays, offset).map((name) => {
      return { text: name, name: 'th' }
    }),
  }
}

export function Day(t: keyof RangeType = 'start'): CreateElementPartOptions {
  type = t
  const classes = ['date']
  if (this.options.type === 'week') classes.push('week')
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

export function endDay(): CreateElementPartOptions {
  return Day('end')
}
