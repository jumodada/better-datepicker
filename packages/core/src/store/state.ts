import {
  getMonth,
  getDateOfNextMonth,
  getYear,
  transformDateToObject,
} from '../utils/date'
import { CellsData, DateData, LocaleConfig, State } from '../types/store'
import map from '../utils/for'
import { reactive } from '../observer'

const createCellsData = (length: number): CellsData[] =>
  map(
    () => ({
      status: 'none',
      date: transformDateToObject(),
    }),
    length
  )

function rangeComponents(date: CellsData['date']): DateData {
  return Object.assign(date, {
    date: transformDateToObject(),
    _date: createCellsData(42),
    _month: createCellsData(12),
    _year: createCellsData(12),
  })
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

let defaultOption: State = {
  id: -1,
  start: rangeComponents(transformDateToObject()),
  end: rangeComponents(getDateOfNextMonth(startYear, startMonth)),
  today: '', //todo
  placement: 'bottom',
  placeholder: '',
  type: 'date',
  _type: 'date',
  isRange: false,
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
  mode: 'day',
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
  const typeToArray = type.split('-')
  return Object.assign({}, defaultOption, options, {
    id,
    type,
    _type: typeToArray[0],
    isRange: typeToArray.length === 2,
  })
}

export function changeDefaultOption(target: State): void {
  defaultOption = Object.assign(defaultOption, target)
}

export function initState(options: Partial<State>, id: number): State {
  return reactive(createOptions(id, options))
}
