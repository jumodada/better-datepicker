import BD from './core'
import { BetterPickerInstance } from './types/core'
import { changeOpt } from './store/default-options'
import { pickerLocale } from './store/default-options'
import { destroyed } from './store'
import { State } from './types/store'

export function createDatePicker(
  options: Partial<State>
): BetterPickerInstance {
  const picker = BD()
  return <BetterPickerInstance>picker(options)
}

export const defaultOptions = changeOpt

export const locale = pickerLocale

export const destroy = destroyed
