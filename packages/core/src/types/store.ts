import { Style } from './utils'
import { Callback } from './core'

export type ComponentStatus =
  | 'other'
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

export interface MonthType<T = unknown, U = unknown> {
  date: T
  month: T
  'month-range': T | U
}
export interface YearType<T = unknown, U = unknown> {
  date: T
  year: T
  month: T
  'year-range': T | U
}
export interface DateType<T = unknown, U = unknown> {
  date: T
  week: T
  'date-range': T | U
}

export interface DatepickerType<T = unknown, U = any>
  extends DateType,
    MonthType,
    YearType {
  date: T
  'date-range': T | U
  week: T
  month: T
  'month-range': T | U
  year: T
  'year-range': T | U
}

export type Placement = 'top' | 'left' | 'bottom' | 'right'

export interface MonthOrYearComponents {
  status: ComponentStatus
  date: string
}

export interface DateData {
  date: string | null
  year: number
  month: number
  _date: DateComponents[]
  _month: MonthOrYearComponents[]
  _year: MonthOrYearComponents[]
}

export interface LocaleConfig {
  name: string
  weekdays: string[]
  months: string[]
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6
  yearFormat: string
  weekFormat: string
  yearStart: number
}

export type RangeStatus = 'complete' | 'selecting'

export interface RangeType<T = null> {
  start: T
  end: T
}

export interface Range extends RangeType<string | null> {
  status: RangeStatus
}

export type pageName = 'date' | 'year' | 'month'

export interface State {
  id: number
  reference: HTMLInputElement | null
  popover: HTMLElement | null
  onChange?: Callback
  visible: boolean
  page: pageName
  locale: LocaleConfig
  destroyed?: Callback
  update?: Callback
  range: Range
  start: DateData
  end: DateData
  today: string
  date: string | string[] | null
  placement: Placement
  placeholder: string
  style: Style
  classes: string[]
  type: keyof DatepickerType
  _type: 'date' | 'month' | 'year'
  unlinkPanels: boolean
  offset: number
  zIndex: number
  format: string
  insertTo: 'body' | 'parent'
  binding: boolean
  disabledDate?: ((date: Date) => boolean) | null
  disabled: boolean
  themeColor: string
  rangeBgColor: string
  tdColor: string
  thColor: string
}

export interface States {
  [key: number]: State
}
