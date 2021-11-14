import {
  DateComponents,
  DateData,
  MonthOrYearComponents,
  State,
} from '../types/store'
import { reactive } from '../observer'
import Options, { LocaleConfig } from '../types/options'
import _for from '../utils/for'
import { getDay, getMonth, getNext, getYear, joinDate } from '../utils/date'

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

function State(options: Options): State {
  const date = new Date()
  const [startYear, startMonth] = [getYear(date), getMonth(date)]
  const [endMonth, endYear] = getNext(startMonth, startYear)
  return {
    reference: null,
    popover: null,
    range: {
      start: null,
      end: null,
      status: 'complete',
    },
    start: rangeComponents(startMonth, startYear),
    end: rangeComponents(endMonth, endYear),
    today: joinDate(startMonth, startYear, getDay(date)),
    date: null,
    visible: false,
    page: 'date',
    locale,
    placement: 'bottom',
    placeholder: '',
    type: 'date',
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
    options,
  }
}

export default function initState(options: Options): State {
  return reactive(State(options))
}
