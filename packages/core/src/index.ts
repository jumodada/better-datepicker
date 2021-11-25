import BD from './core'
import { BetterPickerInstance } from './types/core'
import { changeDefaultOption, pickerLocale } from './store/state'
import { destroyed } from './store'
import { State } from './types/store'

export function createDatePicker(
  options: Partial<State>
): BetterPickerInstance {
  const picker = BD()
  return <BetterPickerInstance>picker(options)
}

export const defaultOptions = changeDefaultOption

export const locale = pickerLocale

export const destroy = destroyed
