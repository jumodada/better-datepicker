import { State } from '../types/store'
import { reactive } from '../observer'
import { mergeOptions } from '../utils/merge'
import defaultOptions from './default-options'

function State(options: Partial<State>): State {
  return mergeOptions(defaultOptions(), options) as State
}

export default function initState(options: Partial<State>): State {
  return reactive(State(options))
}
