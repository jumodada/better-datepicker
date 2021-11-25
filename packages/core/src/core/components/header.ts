import {
  DateComponentsType,
  HeaderChildrenOptions,
} from '../../types/components'
import { visible } from '../../utils/element'
import {
  nextMonth,
  nextYear,
  preMonth,
  preYear,
  toMonthPage,
  toYearPage,
  canIShow,
} from './public'
import { State, RangeType } from '../../types/store'
import { getTenRange } from '../../utils/date'
import { CreateElementRequiredOptions, StyleOption } from '../../types/utils'
import { Bind } from '../../utils/bind'
import { getFormatDate } from '../util/format'

function SVGStyleGenerator(style: Partial<StyleOption>): StyleOption {
  return Object.assign(style, {
    position: 'absolute',
    width: '14px',
    height: '14px',
  })
}

const getRange = (year: number) => {
  const min = getTenRange(year)[1]
  const max = min + 9
  return min + ' - ' + max
}

function format(date: string, state: State): string {
  return getFormatDate.call(state, date, state.locale.yearFormat) as string
}

export function Header(
  state: State,
  name?: keyof RangeType
): CreateElementRequiredOptions {
  const type = name ?? 'start'
  const headerChildren: HeaderChildrenOptions = {
    start: [preYearIcon, preMonthIcon, date],
    main: [
      preYearIcon,
      preMonthIcon,
      yearRange,
      year,
      month,
      nextYearIcon,
      nextMonthIcon,
    ],
    end: [date, nextYearIcon, nextMonthIcon],
  }

  function getTextType(state: State): DateComponentsType {
    return {
      date: () =>
        format(String(state[type].year), state) +
        ' ' +
        state.locale.months[state[type].month - 1],
      month: () => String(state[type].year),
      year: () => getRange(state[type].year),
    }
  }

  function date(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text: getTextType(state)[state._type],
    }
  }

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
        display: () => visible(state.page === 'year'),
      },
      event: toYearPage,
    }
  }

  function year(): CreateElementRequiredOptions {
    return {
      name: 'span',
      text() {
        return format(String(state.start.year), state)
      },
      class: ['pointerCursor'],
      event: toYearPage,
      style: {
        display: () => visible(state.page !== 'year'),
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
      event: toMonthPage,
      style: {
        display: () => visible(state.page !== 'year'),
      },
    }
  }
  return {
    class: ['header'],
    children: headerChildren[name || 'main'],
  }
}
