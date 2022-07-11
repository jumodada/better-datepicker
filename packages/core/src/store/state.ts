import {
  getMonth,
  getDateOfNextMonth,
  getYear,
  transformDateToObject,
} from '../utils/date'
import { CellsData, DateData, LocaleConfig, State } from '../types/store'
import map from '../utils/for'
import { reactive } from '../reactive'

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
  today: new Date(), //todo
  placement: 'bottom',
  placeholder: '',
  type: 'date',
  isRange: false,
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
  style: {},
  classes: [],
  date: null,
  visible: false,
  locale,
  reference: null,
  popover: null,
  hoverSelected: {
    start: null,
    end: null,
    range: [],
    status: 'complete',
  },
}

function createOptions(id: number, options: Partial<State>): State {
  const type = options.type ?? defaultOption.type
  return Object.assign({}, defaultOption, options, {
    id,
    type,
  })
}

export function changeDefaultOption(target: State): void {
  defaultOption = Object.assign(defaultOption, target)
}

export function initState(options: Partial<State>, id: number): State {
  return reactive(createOptions(id, options))
}
