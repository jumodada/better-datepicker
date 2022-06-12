import { Sub } from './reactive'
import { PickersMap } from './store'

export type Listeners<T = Sub> = {
  [key in keyof PickersMap]: T[]
}

export interface ReverseMap {
  start: 'end'
  end: 'start'
}
