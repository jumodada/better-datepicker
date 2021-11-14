import { watchComponents } from './picker'
import { watchDate } from './date'
import { watchOptions } from './options'
import { State } from '../../types/store'

export function watch(state: State): void {
  watchComponents()
  watchDate(state)
  watchOptions()
}
