import { Formats } from '../_types/core'
import { isArray } from './typeOf'
import { getDay, getMonth, getWeeks, getYear } from './date'
import { DateType } from '../_types/utils'
import { LocaleConfig } from '../_types/store'

const token = /d{1,2}|M{1,2}|w{1,2}|yy(?:yy)?|"[^"]*"|'[^']*'/g

const formats: Formats = {
  d: (date: Date) => getDay(date),
  dd: (date: Date) => pad(getDay(date)),
  M: (date: Date) => getMonth(date),
  MM: (date: Date) => pad(getMonth(date)),
  yy: (date: Date) => String(getYear(date)).substr(2),
  yyyy: (date: Date) => getYear(date),
  w: (date: Date, locale) => getWeeks(date, locale),
  ww: (date: Date, locale) => getWeeks(date, locale),
}

function pad(val: string | number, len?: number) {
  val = String(val)
  len = len || 2
  while (val.length < len) {
    val = '0' + val
  }
  return val
}

export function getFormatDate(
  locale: LocaleConfig,
  date: DateType | DateType[],
  formatStr: string
): string | null {
  const separator = ' - '

  function formatParse(dateStr: DateType): string | null {
    if (!dateStr) return null

    // if (has(format, 'w') && isDate(dateStr)) {
    //   dateStr = getWeekRange(dateStr, locale.weekStart).start
    // }
    // getWeekRange(dateStr, locale.weekStart)
    return formatStr.replace(token, (val) => {
      return formats[val as 'dd'](new Date(dateStr.toString()), locale)
    })
  }

  if (isArray(date)) {
    const res = date.map((d) => formatParse(d)).join(separator)
    return res === separator ? '' : res
  }
  return formatParse(date)
}
