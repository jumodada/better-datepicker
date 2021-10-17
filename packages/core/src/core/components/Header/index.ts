import {
  DateComponentsType,
  HeaderChildrenOptions,
} from '../../../types/components'
import { visible } from '../../../utils/element'
import {
  nextMonth,
  nextYear,
  preMonth,
  preYear,
  isDayPage,
  toMonthPage,
  toYearPage,
  canIShow,
} from '../utils'
import { pageName, State, RangeType } from '../../../types/store'
import { getTenRange } from '../../../utils/date'
import { CreateElementPartOptions } from '../../../types/utils'
import { Bind } from '../../../utils/bind'
import { getFormatDate } from '../../util/format'
import { SVGStyle } from './type'
import { Sub } from '../../../types/observer'

let name: keyof RangeType = 'start'

function SVGStyleGenerator(style: Partial<SVGStyle>): SVGStyle {
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

function yearRange(): CreateElementPartOptions {
  return {
    name: 'span',
    text() {
      return getRange(this[name].year)
    },
    $style: canIShow((page: pageName) => visible(page === 'year')),
    event: toYearPage,
  }
}

function year(): CreateElementPartOptions {
  return {
    name: 'span',
    text() {
      return format(String(this.start.year), this)
    },
    class: ['pointerCursor'],
    event: toYearPage,
    $style: canIShow((page: pageName) => visible(page !== 'year')),
    style: {
      display: 'inline-block',
    },
  }
}

function month(): CreateElementPartOptions {
  return {
    name: 'span',
    text() {
      return this.locale.months[this[name].month - 1]
    },
    class: ['pointerCursor'],
    event: toMonthPage,
    $style: canIShow(isDayPage),
  }
}

export function getTextType(state: State): DateComponentsType {
  return {
    date: () =>
      format(String(state[name].year), state) +
      ' ' +
      state.locale.months[state[name].month - 1],
    month: () => String(state[name].year),
    year: () => getRange(state[name].year),
  }
}

function date(): CreateElementPartOptions {
  return {
    name: 'span',
    text: getTextType(this)[this._type as 'year'],
  }
}

function preYearIcon(): CreateElementPartOptions {
  return {
    name: 'svg',
    text: 'year',
    style: SVGStyleGenerator({ left: '30px' }),
    event: preYear,
  }
}

function preMonthIcon(): CreateElementPartOptions {
  return {
    name: 'svg',
    text: 'month',
    style: SVGStyleGenerator({
      left: '50px',
    }),
    event: preMonth,
    $style: canIShow(isDayPage),
  }
}

function nextYearIcon(): CreateElementPartOptions {
  return {
    name: 'svg',
    text: 'year',
    style: SVGStyleGenerator({
      right: '30px',
      transform: 'rotate(180deg)',
    }),
    event: Bind(nextYear, name),
  }
}

function nextMonthIcon(): CreateElementPartOptions {
  return {
    name: 'svg',
    text: 'month',
    style: SVGStyleGenerator({
      right: '50px',
      transform: 'rotate(180deg)',
    }),
    event: Bind(nextMonth, name),
    $style: canIShow(isDayPage),
  }
}

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

export function Header(t?: keyof RangeType): CreateElementPartOptions {
  name = t || 'start'
  return {
    class: ['header'],
    children: headerChildren[t || 'main'],
  }
}

export function HeaderLeft(): CreateElementPartOptions {
  return Header('start')
}

export function HeaderRight(): CreateElementPartOptions {
  return Header('end')
}
