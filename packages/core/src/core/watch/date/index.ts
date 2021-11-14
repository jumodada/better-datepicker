import { addWatch } from '../../../observer/watcher'
import { linkMonth } from './type/date&week/date-range'
import { LinkYear, watchYM } from './type/month&year'
import {
  handleSelecting,
  endDate,
  hoverSelect,
  startMonthAndYear,
} from './type/public'
import { Listeners } from '../../../types/watch'
import { has } from '../../../utils/typeOf'
import { updateDays } from './type/date&week/public'
import { dispatchDateChange } from '../../util/method'
import { State } from '../../../types/store'

const dateWeek = [updateDays, watchYM(false), watchYM(), startMonthAndYear]
const listeners: Listeners = {
  'date-range': [
    updateDays,
    linkMonth(),
    linkMonth('end'),
    hoverSelect('date'),
  ],
  date: dateWeek,
  week: dateWeek,
  month: [watchYM(), watchYM(false)],
  'month-range': [
    watchYM(),
    LinkYear(),
    LinkYear('end'),
    watchYM(true, 'end'),
    hoverSelect(),
  ],
  year: [watchYM(false)],
  'year-range': [
    watchYM(false),
    watchYM(false, 'end'),
    LinkYear('start', true),
    LinkYear('end', true),
    hoverSelect('year'),
  ],
}

const currency = [updateDays, dispatchDateChange]
const range = [handleSelecting, endDate]

export function watchDate(state: State): void {
  const { type } = state
  let publicListener = currency
  if (has(type, 'range')) publicListener = publicListener.concat(range)
  addWatch(listeners[type].concat(publicListener))
}
