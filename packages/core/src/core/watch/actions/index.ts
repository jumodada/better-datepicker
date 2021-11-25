import { addWatch } from '../../../observer/watcher'
import { LinkYear, watchYM } from './month&year'
import { linkMonth } from './date&week'
import { handleSelecting, endDate, startMonthAndYear } from './public'
import { Listeners } from '../../../types/watch'
import { has } from '../../../utils/typeOf'
import { dispatchDateChange } from '../../util/method'
import { State } from '../../../types/store'
import { updateDays } from './date&week'

const dateWeek = [updateDays, watchYM(false), watchYM(), startMonthAndYear]
const listeners: Listeners = {
  'date-range': [updateDays, linkMonth(), linkMonth('end')],
  date: dateWeek,
  week: dateWeek,
  month: [watchYM(), watchYM(false)],
  'month-range': [watchYM(), LinkYear(), LinkYear('end'), watchYM(true, 'end')],
  year: [watchYM(false)],
  'year-range': [
    watchYM(false),
    watchYM(false, 'end'),
    LinkYear('start', true),
    LinkYear('end', true),
  ],
}

const currency = [updateDays, dispatchDateChange]
const range = [handleSelecting, endDate]

export function actions(state: State): void {
  const { type } = state
  let publicListener = currency
  if (has(type, 'range')) publicListener = publicListener.concat(range)
  addWatch(listeners[type].concat(publicListener))
}
