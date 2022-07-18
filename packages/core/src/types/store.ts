import { Style } from './utils'
import { Callback } from './core'

export type ComponentStatus =
  | 'none'
  | 'pre'
  | 'next'
  | 'selected'
  | 'inRange'
  | 'inRangeWeek'
  | 'range-start'
  | 'range-end'
  | 'range-start range-end'
  | 'today'
  | 'disabled'
  | 'weekStart'
  | 'weekEnd'

export interface CellsData {
  status: ComponentStatus
  date: {
    year: number
    month: number
    day: number
  }
}

export interface MonthType<T = unknown, U = unknown> {
  date: T
  'date-range': T
  'date-week': T
  month: T
  'month-range': T | U
}

export interface YearType<T = unknown, U = unknown> {
  date: T
  'date-range': T
  'date-week': T
  year: T
  month: T
  'year-range': T | U
}

export interface DateType<T = unknown, U = unknown> {
  date: T
  'date-week': T
  'date-range': T | U
}

export interface PickersMap<T = unknown, U = any>
  extends DateType,
    MonthType,
    YearType {
  date: T
  'date-range': T | U
  'date-week': T
  month: T
  'month-range': T | U
  year: T
  'year-range': T | U
}

export type Placement = 'top' | 'left' | 'bottom' | 'right'

export interface DateData {
  year: number
  month: number
  day: number
  date: CellsData['date']
  _date: CellsData[]
  _month: CellsData[]
  _year: CellsData[]
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

export type getRangeStatus = 'complete' | 'selecting'

export interface RangeType<T = null> {
  start: T
  end: T
}

export interface Range extends RangeType<CellsData['date'] | null> {
  status: getRangeStatus
  range: CellsData['date'][]
}

export type mode = 'date' | 'year' | 'month'

export interface State {
  reference: HTMLInputElement | null
  popover: HTMLElement | null
  onChange?: Callback
  visible: boolean
  locale: LocaleConfig
  destroyed?: Callback
  update?: Callback
  create?: Callback
  hoverSelected: Range
  start: DateData
  end: DateData
  today: Date
  date: string | string[] | null
  placement: Placement
  placeholder: string
  style: Style
  classes: string[]
  type: keyof PickersMap
  isRange: boolean
  isWeek: boolean
  unlinkPanels: boolean
  offset: number
  zIndex: number
  mode: mode
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
