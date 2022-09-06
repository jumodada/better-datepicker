import BD from './picker'
import { BetterPickerInstance } from './_types/core'
import { changeDefaultOption, pickerLocale } from './picker/create-state'
import { State } from './_types/store'

export function createDatePicker(
  options: Partial<State>
): BetterPickerInstance {
  const picker = BD()
  return <BetterPickerInstance>picker(options)
}

export const defaultOptions = changeDefaultOption

export const locale = pickerLocale
