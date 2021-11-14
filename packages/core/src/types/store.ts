import { DatepickerType, LocaleConfig, Placement } from './options'
import { DateType, Style } from './utils'
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
  date: DateType | DateType[]
  placement: Placement
  placeholder: string
  style: Style
  classes: string[]
  type: keyof DatepickerType
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
