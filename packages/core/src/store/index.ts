import {
  dateToObject,
  getDateOfNextMonth,
  getMonth,
  getYear,
} from '../utils/date'
import { CellsData, DateData, LocaleConfig, State } from '../types/store'
import map from '../utils/for'
import { extend, merge, mergePrimitiveValues } from '../utils/extend'
import { reactive } from '../reactive'

const createCellsData = (length: number): CellsData[] =>
  map(
    () => ({
      status: 'none',
      date: dateToObject(),
    }),
    length
  )

function rangeComponents(date: CellsData['date']): DateData {
  return extend(date, {
    date: dateToObject(),
    _date: createCellsData(42),
    _month: createCellsData(12),
    _year: createCellsData(12),
  })
}

const locale: LocaleConfig = {
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
  extend(locale, config)
}

const date = new Date()
const [startYear, startMonth] = [getYear(date), getMonth(date)]

const pickerConfig = {
  today: dateToObject(),
  placement: 'bottom',
  placeholder: '',
  type: 'date',
  isRange: false,
  isWeek: false,
  zIndex: 2000,
  unlinkPanels: false,
  format: 'yyyy/MM/dd',
  offset: 12,
  mode: 'date',
  insertTo: 'body',
  binding: true,
  disabled: false,
  disabledDate: null,
  themeColor: '',
  rangeBgColor: '',
  tdColor: '',
  thColor: '',
  date: null,
  visible: false,
  reference: null,
  popover: null,
}

function getDefaultOptions() {
  return merge(pickerConfig, {
    style: {},
    classes: [],
    locale,
    hoverSelected: {
      start: null,
      end: null,
      range: [],
      status: 'complete',
    },
    start: rangeComponents(dateToObject()),
    end: rangeComponents(getDateOfNextMonth(startYear, startMonth)),
  })
}

export function createState(options: Partial<State>): State {
  return reactive(mergePrimitiveValues(getDefaultOptions(), options))
}

export function changeDefaultOption(target: State): void {
  extend(pickerConfig, target)
}
