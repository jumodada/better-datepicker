import Options, {DatepickerType, LocaleConfig} from './options'
import {DateType, Fn} from "./utils"
import {Callback} from "./core"

interface Watcher<K> {
    (target: stateComponent, key: keyof K, value: unknown): void
}

type componentWatcher = Watcher<componentsWatchers>
type dateWatcher = Watcher<dateWatchers>
type utilWatcher = Watcher<utilWatchers>

export type ComponentStatus =
    'other'
    | 'pre'
    | 'next'
    | 'selected'
    | 'inRange'
    | 'inRangeWeek'
    | 'range-start'
    | 'range-end'
    | ''
    | 'range-start range-end'
    | 'today'
    | 'disabled'
    | 'weekStart'
    | 'weekEnd'

export interface DateComponents {
    text: string
    status: ComponentStatus
    date: string
}

export interface MonthOrYearComponents {
    status: ComponentStatus
    date: string
}

export interface stateComponent<T = null | HTMLElement, U = null | Fn> {
    reference: HTMLInputElement | null
    popover: T
    onChange: U
}

export interface DateData {
    date: string | null
    year: number
    month: number
    _date: DateComponents[]
    _month: MonthOrYearComponents[]
    _year: MonthOrYearComponents[]
}

export type RangeStatus = 'complete' | 'selecting'

export interface RangeType<T = null> {
    start: T
    end: T
}

export interface Range extends RangeType<string | null> {
    status: RangeStatus
}

export interface stateDate<T = Date> {
    range: Range
    start: DateData
    end: DateData
    today: string
    date: DateType | DateType[]
}

export type pageName = 'date' | 'year' | 'month'

export interface stateUtil {
    options: Options
    visible: boolean
    page: pageName
    locale: LocaleConfig
    destroyed?: Callback
}

export interface componentsWatchers<T = componentWatcher> {
    reference: T
    popover: T
}

export interface dateWatchers<T = dateWatcher> {
    startDate: T
}

export interface utilWatchers<T = utilWatcher> {
    options: T
    visible: T
    page: T
}

export interface State extends stateComponent, stateUtil, stateDate {
    id: number
    type: keyof DatepickerType
    _type: pageName
    hasWW: boolean
}


export interface States {
    [key: number]: State
}
