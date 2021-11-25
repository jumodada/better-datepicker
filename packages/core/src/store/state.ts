import { LocaleConfig, PickerOptions } from '../../dist/types/types/options'
import { getDay, getMonth, getNext, getYear, joinDate } from '../utils/date'
import {
  DateComponents,
  DateData,
  MonthOrYearComponents,
  State,
} from '../types/store'
import _for from '../utils/for'
import { reactive } from '../observer'

const dayComponents = (): DateComponents[] =>
  _for(
    () => ({
      text: '',
      status: '',
      date: '',
    }),
    42
  )

const _Components = (): MonthOrYearComponents[] =>
  _for(
    () => ({
      status: '',
      date: '',
    }),
    12
  )

function rangeComponents(month: number, year: number): DateData {
  return {
    date: null,
    year,
    month,
    _date: dayComponents(),
    _month: _Components(),
    _year: _Components(),
  }
}

let locale: LocaleConfig = {
  name: 'en',
  weekStart: 0,
  weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  yearFormat: 'yyyy',
  weekFormat: 'yyyy-wwth',
  yearStart: 1,
}

export function pickerLocale(config: LocaleConfig): void {
  locale = Object.assign({}, config)
}

const date = new Date()
const [startYear, startMonth] = [getYear(date), getMonth(date)]
const [endMonth, endYear] = getNext(startMonth, startYear)

let defaultOption: State = {
  id: -1,
  start: rangeComponents(startMonth, startYear),
  end: rangeComponents(endMonth, endYear),
  today: joinDate(startMonth, startYear, getDay(date)),
  placement: 'bottom',
  placeholder: '',
  type: 'date',
  _type: 'date',
  zIndex: 2000,
  unlinkPanels: false,
  format: 'yyyy/MM/dd',
  offset: 12,
  insertTo: 'body',
  binding: true,
  disabled: false,
  disabledDate: null,
  themeColor: '',
  rangeBgColor: '',
  tdColor: '',
  thColor: '',
  style: {},
  classes: [],
  date: null,
  visible: false,
  page: 'date',
  locale,
  reference: null,
  popover: null,
  range: {
    start: null,
    end: null,
    status: 'complete',
  },
}

function createOptions(id: number, options: Partial<State>): State {
  const type = options.type ?? defaultOption.type
  return Object.assign(
    {
      id,
      type,
      _type: type.split('-').shift(),
    },
    defaultOption,
    options
  )
}

export function changeDefaultOption(target: PickerOptions): void {
  defaultOption = Object.assign(defaultOption, target)
}

export function initState(options: Partial<State>, id: number): State {
  return reactive(createOptions(id, options))
}
