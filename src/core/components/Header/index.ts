import {DateComponentsType, HeaderChildrenOptions} from '../../../types/components'
import {visible} from '../../../utils/element'
import {nextMonth, nextYear, preMonth, preYear, isDayPage, toMonthPage, toYearPage} from '../utils'
import {pageName, State, RangeType} from '../../../types/store'
import {getTenRange} from '../../../utils/date'
import {CreateElementPartOptions} from '../../../types/utils'
import {Bind} from "../../../utils/bind"
import {getFormatDate} from "../../util/format"
import {SVGStyle} from "./type"

let name: keyof RangeType = 'start'

const togglePage = {
    display: {
        key: ['page'],
        cb: isDayPage
    }
}

function SVGStyleGenerator(style: Partial<SVGStyle>): SVGStyle {
    return Object.assign(style, {
        position: 'absolute',
        width: '14px',
        height: '14px'
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
        text: {
            key: {
                name: 'start',
                childKey: ['year', '_date']
            },
            cb: (year: number) => getRange(year)
        },
        $style: {
            display: {
                key: ['page'],
                cb: (page: pageName) => visible(page === 'year')
            }
        },
        event: toYearPage
    }
}

function year(state: State): CreateElementPartOptions {
    return {
        name: 'span',
        text: {
            key: {
                name,
                childKey: ['year', '_date']
            },
            cb: year => format(year, state)
        },
        class: ['pointerCursor'],
        event: toYearPage,
        $style: {
            display: {
                key: ['page'],
                cb: (page: pageName) => visible(page !== 'year')
            }
        }
    }
}

function month(state: State): CreateElementPartOptions {
    return {
        name: 'span',
        text: {
            key: {
                name,
                childKey: ['month']
            },
            cb: (idx: number) => state.locale.months[idx - 1]
        },
        class: ['pointerCursor'],
        event: toMonthPage,
        $style: togglePage
    }
}

export function getTextType(state: State): DateComponentsType<[string[], (...arg: any) => string]> {
    return {
        date: [['month', 'year'], (idx: number, year: string) => format(year, state) + ' ' + state.locale.months[idx - 1]],
        month: [['year'], (year: number) => String(year)],
        year: [['year', '_date'], (year: number) => getRange(year)],
    }
}

function date(state: State): CreateElementPartOptions {
    const [childKey, cb] = getTextType(state)[state._type]
    return {
        name: 'span',
        text: {
            key: {
                name,
                childKey
            },
            cb
        }
    }
}

function preYearIcon(): CreateElementPartOptions {
    return {
        name: 'svg',
        text: 'year',
        style: SVGStyleGenerator({left: '30px'}),
        event: preYear
    }
}

function preMonthIcon(): CreateElementPartOptions {
    return {
        name: 'svg',
        text: 'month',
        style: SVGStyleGenerator({
            left: '50px'
        }),
        event: preMonth,
        $style: togglePage
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
        event: Bind(nextYear, name)
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
        $style: togglePage
    }
}

const headerChildren: HeaderChildrenOptions = {
    start: [preYearIcon, preMonthIcon, date],
    main: [preYearIcon, preMonthIcon, yearRange, year, month, nextYearIcon, nextMonthIcon],
    end: [date, nextYearIcon, nextMonthIcon]
}

export function Header(state: State, t?: keyof RangeType): CreateElementPartOptions {
    name = t || 'start'
    return {
        class: ['header'],
        children: headerChildren[t || 'main'],
        style: {
            width: '298px',
            'text-align': 'center'
        }
    }
}

export function HeaderLeft(state: State): CreateElementPartOptions {
    return Header(state, 'start')
}

export function HeaderRight(state: State): CreateElementPartOptions {
    return Header(state, 'end')
}
