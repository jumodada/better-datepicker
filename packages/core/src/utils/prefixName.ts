import { has } from './typeOf'

const prefixName = 'better-datepicker'

export function addPrefixName(str: string): string {
  return has(str, prefixName) ? str : prefixName + '-' + str
}
