import { isElementShow } from '../utils/element'
import { handleRange, selectYM, dayMode, monthMode } from './public'
import { CellsData, RangeType, State } from '../types/store'
import {
  ComponentsType,
  createMonthOrYearComponentsFunction,
  CreateMonthOrYearComponentsOptions,
  MonthEvent,
  YearEvent,
} from '../types/components'
import { CreateElementRequiredOptions } from '../types/utils'
import map from '../utils/for'
import { getTenYearTimeRange } from '../utils/date'
import { Bind } from '../utils/bind'

const rows = 3
const cols = 4

function monthEvent(state: CellsData): MonthEvent {
  return {
    date: Bind(dayMode, state),
    'date-range': Bind(dayMode, state),
    'month-range': handleRange(state),
    month: Bind(selectYM, [state, 'month']),
  }
}

function yearEvent(state: CellsData): YearEvent {
  const toggleMonth = Bind(monthMode, state)
  return {
    date: toggleMonth,
    'date-range': toggleMonth,
    month: toggleMonth,
    year: Bind(selectYM, [state, 'year']),
    'year-range': handleRange(state),
  }
}

export function YM(
  componentName: keyof ComponentsType = 'month'
): createMonthOrYearComponentsFunction {
  return function (
    state: State,
    t: keyof RangeType = 'start'
  ): CreateElementRequiredOptions {
    const components: CreateMonthOrYearComponentsOptions = {
      month: {
        listener: (child, state) => monthEvent(child)[state.type as 'date'],
        children: (idx) => [{ text: state.locale.months[idx] }],
      },
      year: {
        listener: (child, state) => yearEvent(child)[state.type as 'date'],
        children: (idx: number) => [
          {
            text() {
              return String(getTenYearTimeRange(state[t].year)[idx])
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
      return map((rc) => {
        return {
          name: 'tr',
          children: td(rc),
        }
      }, rows)
    }

    const td = (rc: number): CreateElementRequiredOptions[] => {
      return map((cc) => {
        const idx = rc * cols + cc
        const child = state[t][('_' + componentName) as '_month'][idx]
        return {
          name: 'td',
          event: listener(child, state),
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
        display: () => isElementShow(state.mode === componentName),
      },
    }
  }
}

export const Month = YM()

export const Year = YM('year')
