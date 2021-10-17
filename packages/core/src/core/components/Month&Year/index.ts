import { visible } from '../../../utils/element'
import { canIShow } from '../utils'
import { State, RangeType } from '../../../types/store'
import {
  ComponentsType,
  createMonthOrYearComponentsFunction,
  CreateMonthOrYearComponentsOptions,
} from '../../../types/components'
import { monthEvent, yearEvent } from './event'
import { CreateElementPartOptions } from '../../../types/utils'
import _for from '../../../utils/for'
import { getTenRange } from '../../../utils/date'

let type: keyof RangeType = 'start'
const rows = 3
const cols = 4

const components: CreateMonthOrYearComponentsOptions = {
  month: {
    listener: (child, state) => monthEvent(child)[state.options.type as 'date'],
    children: (idx, months) => [{ text: months[idx] }],
  },
  year: {
    listener: (child, state) => yearEvent(child)[state.options.type as 'date'],
    children: (idx: number) => [
      {
        text() {
          return String(getTenRange(this[type].year)[idx])
        },
      },
    ],
  },
}

export function YM(
  componentName: keyof ComponentsType = 'month'
): createMonthOrYearComponentsFunction {
  const { children, listener } = components[componentName]
  return function (t: keyof RangeType = 'start'): CreateElementPartOptions {
    type = t
    function tBody(): CreateElementPartOptions {
      return {
        children: tr(),
        name: 'tbody',
      }
    }

    const tr = (): CreateElementPartOptions[] => {
      return _for((rc) => {
        return {
          name: 'tr',
          children: td(rc),
        }
      }, rows)
    }

    const td = (rc: number): CreateElementPartOptions[] => {
      return _for((cc) => {
        const idx = rc * cols + cc
        const child = this[type][('_' + componentName) as '_month'][idx]
        return {
          name: 'td',
          event: {
            listener: listener(child, this),
            arg: child,
          },
          children: children(idx, this.locale.months),
          class: () => child.status,
        }
      }, cols)
    }

    return {
      name: 'table',
      children: [tBody()],
      class: [componentName],
      $style: canIShow(() => visible(this.page === componentName)),
    }
  }
}

export const Month = YM()

export function endMonth(): CreateElementPartOptions {
  return Month.call(this, 'end')
}

export const Year = YM('year')

export function endYear(): CreateElementPartOptions {
  return Year.call(this, 'end')
}
