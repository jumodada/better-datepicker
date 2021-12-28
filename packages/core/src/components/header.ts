import { isElementShow } from '../utils/element'
import {
  nextMonth,
  nextYear,
  preMonth,
  preYear,
  monthMode,
  yearMode,
  canIShow,
} from './public'
import { State, RangeType } from '../types/store'
import { getTenYearTimeRange } from '../utils/date'
import { CreateElementRequiredOptions, StyleOption } from '../types/utils'
import { Bind } from '../utils/bind'
import { getFormatDate } from '../utils/format'

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
  return getFormatDate.call(state, date, state.locale.yearFormat) as string
}

export function Header(
  state: State,
  type: keyof RangeType
): CreateElementRequiredOptions {
  function preYearIcon(): CreateElementRequiredOptions {
    return {
      name: 'yearIcon',
      style: SVGStyleGenerator({ left: '30px' }),
      event: preYear,
    }
  }

  function preMonthIcon(): CreateElementRequiredOptions {
    return {
      name: 'monthIcon',
      style: SVGStyleGenerator({
        left: '50px',
        display: canIShow(state),
      }),
      event: preMonth,
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
        display: canIShow(state),
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
        display: () => isElementShow(state.mode === 'year'),
      },
      event: yearMode,
    }
  }

  function year(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text() {
        return format(String(state.start.year), state)
      },
      class: ['pointerCursor'],
      event: yearMode,
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
      event: monthMode,
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
