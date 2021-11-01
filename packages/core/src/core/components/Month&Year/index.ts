import { visible } from '../../../utils/element'
import { canIShow } from '../utils'
import { RangeType } from '../../../types/store'
import {
  ComponentsType,
  createMonthOrYearComponentsFunction,
  CreateMonthOrYearComponentsOptions,
} from '../../../types/components'
import { monthEvent, yearEvent } from './event'
import { CreateElementPartOptions } from '../../../types/utils'
import _for from '../../../utils/for'
import { getTenRange } from '../../../utils/date'

const rows = 3
const cols = 4

export function YM(
  componentName: keyof ComponentsType = 'month'
): createMonthOrYearComponentsFunction {
  return function (t: keyof RangeType = 'start'): CreateElementPartOptions {
    const components: CreateMonthOrYearComponentsOptions = {
      month: {
        listener: (child, state) =>
          monthEvent(child)[state.options.type as 'date'],
        children: (idx) => [{ text: this.locale.months[idx] }],
      },
      year: {
        listener: (child, state) =>
          yearEvent(child)[state.options.type as 'date'],
        children: (idx: number) => [
          {
            text() {
              return String(getTenRange(this[t].year)[idx])
            },
          },
        ],
      },
    }
    const { children, listener } = components[componentName]
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
        const child = this[t][('_' + componentName) as '_month'][idx]

        return {
          name: 'td',
          event: listener(child, this),
          children: children(idx),
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
