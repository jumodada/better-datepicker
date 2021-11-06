import { MonthEvent, YearEvent } from '../../../types/components'
import { handleRange, selectYM, toDayPage, toMonthPage } from '../utils'
import { Bind } from '../../../utils/bind'
import { MonthOrYearComponents } from '../../../types/store'

export function monthEvent(state: MonthOrYearComponents): MonthEvent {
  return {
    date: Bind(toDayPage, state),
    'month-range': handleRange(state),
    month: Bind(selectYM, [state, 'month']),
  }
}

export function yearEvent(state: MonthOrYearComponents): YearEvent {
  const toggleMonth = Bind(toMonthPage, state)
  return {
    date: toggleMonth,
    'year-range': handleRange(state),
    year: Bind(selectYM, [state, 'year']),
    month: toggleMonth,
  }
}
