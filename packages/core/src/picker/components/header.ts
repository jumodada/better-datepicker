import { isElementShow } from '../../utils/element'
import { isShow, toggleMonthMode, toggleYearMode } from '../action'
import { RangeType, State } from '../../_types/store'
import { getDateOfNextMonth, getTenYearTimeRange } from '../../utils/date'
import { CreateElementRequiredOptions, StyleOption } from '../../_types/utils'
import { Bind } from '../../utils/bind'
import { getFormatDate } from '../../utils/format'

const svgSize = '14px'

function SVGStyleGenerator(style: Partial<StyleOption>): StyleOption {
  return Object.assign(style, {
    position: 'absolute',
    width: svgSize,
    height: svgSize,
  })
}

const getRange = (year: number) => {
  const min = getTenYearTimeRange(year)[1]
  const max = min + 9
  return min + ' - ' + max
}

function format(date: string, state: State): string {
  return getFormatDate(state.locale, date, state.locale.yearFormat) as string
}

export function Header(
  state: State,
  type: keyof RangeType
): CreateElementRequiredOptions {
  function nextYear(): void {
    const num = state.mode === 'year' ? 10 : 1
    this[type].year += num
  }

  function preYear(): void {
    const num = state.mode === 'year' ? 10 : 1
    this[type].year -= num
  }

  function nextMonth(): void {
    const child = state[type]
    const { month, year } = child
    const { month: nextMonth } = getDateOfNextMonth(year, month)
    child.month = nextMonth
  }

  function preMonth(): void {
    const child = state[type]
    const { month, year } = child
    const { month: preMonth, year: preYear } = getDateOfNextMonth(year, month)
    ;[child.month, child.year] = [preMonth, preYear]
  }

  function preYearIcon(): CreateElementRequiredOptions {
    return {
      name: 'yearIcon',
      style: SVGStyleGenerator({ left: '30px' }),
      event: Bind(preYear, type),
    }
  }

  function preMonthIcon(): CreateElementRequiredOptions {
    return {
      name: 'monthIcon',
      style: SVGStyleGenerator({
        left: '50px',
        display: isShow(state),
      }),
      event: Bind(preMonth, type),
    }
  }

  function nextYearIcon(): CreateElementRequiredOptions {
    return {
      name: 'yearIcon',
      style: SVGStyleGenerator({
        right: '30px',
        transform: 'rotate(180deg)',
      }),
      event: Bind(nextYear, type),
    }
  }

  function nextMonthIcon(): CreateElementRequiredOptions {
    return {
      name: 'monthIcon',
      text: 'month',
      style: SVGStyleGenerator({
        right: '50px',
        transform: 'rotate(180deg)',
        display: isShow(state),
      }),
      event: Bind(nextMonth, type),
    }
  }

  function yearRange(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text() {
        return getRange(state[type].year)
      },
      style: {
        display: () => isElementShow(state.mode === 'year' && type === 'start'),
      },
      event: Bind(toggleYearMode, type),
    }
  }

  function year(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text() {
        return String(state[type].year)
      },
      class: ['pointerCursor'],
      event: Bind(toggleYearMode, type),
      style: {
        display: () => isElementShow(state.mode !== 'year'),
      },
    }
  }

  function month(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text() {
        return state.locale.months[state[type].month - 1]
      },
      class: ['pointerCursor'],
      event: Bind(toggleMonthMode, type),
      style: {
        display: () => isElementShow(state.mode !== 'year'),
      },
    }
  }

  return {
    class: ['header'],
    children: [
      preYearIcon,
      preMonthIcon,
      yearRange,
      year,
      month,
      nextYearIcon,
      nextMonthIcon,
    ],
  }
}
