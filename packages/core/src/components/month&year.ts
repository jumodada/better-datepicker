import { isElementShow } from '../utils/element'
import {
  getRangeModeListener,
  selectYearOrMonth,
  toggleToDayMode,
  toggleMonthMode,
} from '../method'
import { CellsData, RangeType, State } from '../types/store'
import {
  ComponentsType,
  createMonthOrYearComponentsFunction,
  CreateMonthOrYearComponentsOptions,
  MonthCellListener,
  YearCellListener,
} from '../types/components'
import { CreateElementRequiredOptions } from '../types/utils'
import map from '../utils/for'
import { getTenYearTimeRange } from '../utils/date'
import { Bind } from '../utils/bind'
import { extend } from '../utils/extend'

const rows = 3
const cols = 4

function dateCellListener(state: CellsData, handleFn: () => any) {
  return {
    date: handleFn,
    'date-range': handleFn,
    'date-week': handleFn,
  }
}

function monthCellListener(state: CellsData): MonthCellListener {
  return extend(dateCellListener(state, Bind(toggleToDayMode, state)), {
    month: Bind(selectYearOrMonth, [state, 'month']),
    'month-range': getRangeModeListener(state),
  })
}

function yearCellListener(state: CellsData): YearCellListener {
  const toggleMonth = Bind(toggleMonthMode, state)
  return extend(dateCellListener(state, toggleMonth), {
    month: toggleMonth,
    year: Bind(selectYearOrMonth, [state, 'year']),
    'year-range': getRangeModeListener(state),
  })
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
        listener: (child, state) =>
          monthCellListener(child)[state.type as 'date'],
        children: (idx) => [{ text: state.locale.months[idx] }],
      },
      year: {
        listener: (child, state) =>
          yearCellListener(child)[state.type as 'date'],
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
