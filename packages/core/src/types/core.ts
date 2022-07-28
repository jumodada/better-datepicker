import { LocaleConfig, State } from './store'

export interface BetterPicker {
  (options: Partial<State>): BetterPickerInstance
}

export type GetDateType = (Date | null) | (Date | null)[]

export type Callback = (...arg: any) => unknown

export interface BetterPickerInstance {
  update: (options: any) => void
  destroyed: () => void
  clear: () => void
  state: State
}

export interface FormatValidator<R = number, P = unknown> {
  (date: Date, ...arg: P[]): R
}

export interface Formats {
  d: FormatValidator
  dd: FormatValidator<string>
  M: FormatValidator
  MM: FormatValidator<string>
  yy: FormatValidator<string>
  yyyy: FormatValidator
  w: FormatValidator<number, LocaleConfig>
  ww: FormatValidator<number, LocaleConfig>
}

export interface GetStatusFunctions {
  (this: State, date: string, idx: number): string
}

export interface GetStatusFunctionsType {
  year: GetStatusFunctions
  month: GetStatusFunctions
  date: GetStatusFunctions
  'date-week': (date: Date) => void
}
