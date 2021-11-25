import { actions } from './actions'
import { State } from '../../types/store'
import { init } from './init'

export function watch(state: State): void {
  init()
  actions(state)
}
