import { visible } from '../../utils/element'
import { handleRange, selectYM, toDayPage, toMonthPage } from './public'
import { MonthOrYearComponents, RangeType } from '../../types/store'
import {
  ComponentsType,
  createMonthOrYearComponentsFunction,
  CreateMonthOrYearComponentsOptions,
  MonthEvent,
  YearEvent,
} from '../../types/components'
import { CreateElementRequiredOptions } from '../../types/utils'
import _for from '../../utils/for'
import { getTenRange } from '../../utils/date'
import { Bind } from '../../utils/bind'

const rows = 3
const cols = 4

function monthEvent(state: MonthOrYearComponents): MonthEvent {
  return {
    date: Bind(toDayPage, state),
    'month-range': handleRange(state),
    month: Bind(selectYM, [state, 'month']),
  }
}

function yearEvent(state: MonthOrYearComponents): YearEvent {
  const toggleMonth = Bind(toMonthPage, state)
  return {
    date: toggleMonth,
    'year-range': handleRange(state),
    year: Bind(selectYM, [state, 'year']),
    month: toggleMonth,
  }
}

export function YM(
  componentName: keyof ComponentsType = 'month'
): createMonthOrYearComponentsFunction {
  return function (t: keyof RangeType = 'start'): CreateElementRequiredOptions {
    const components: CreateMonthOrYearComponentsOptions = {
      month: {
        listener: (child, state) => monthEvent(child)[state.type as 'date'],
        children: (idx) => [{ text: this.locale.months[idx] }],
      },
      year: {
        listener: (child, state) => yearEvent(child)[state.type as 'date'],
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
    function tBody(): CreateElementRequiredOptions {
      return {
        children: tr(),
        name: 'tbody',
      }
    }

    const tr = (): CreateElementRequiredOptions[] => {
      return _for((rc) => {
        return {
          name: 'tr',
          children: td(rc),
        }
      }, rows)
    }

    const td = (rc: number): CreateElementRequiredOptions[] => {
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
      style: {
        display: () => visible(this.page === componentName),
      },
    }
  }
}

export const Month = YM()

export const Year = YM('year')
