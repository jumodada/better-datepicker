import { State, States } from '../types/store'
import initState from './state'
import Options from '../types/options'

const Store = (function () {
  let id = 0
  const states: States = {}

  function getState() {
    return states[id]
  }

  function removeState(id: number) {
    delete states[id]
  }

  function createState(options: Options): State {
    const state = initState(options)
    state._type = options.type.split('-').shift() as 'date'
    state.id = ++id
    states[id] = state
    return state
  }

  function runDestroyed(state: State) {
    if (state && state.destroyed) {
      state.destroyed()
    }
  }

  function destroyed(partialStates?: State[]) {
    if (partialStates) {
      partialStates.forEach((state) => runDestroyed(states[state.id]))
    } else {
      Object.keys(states).forEach((key) =>
        runDestroyed(states[key as unknown as keyof typeof states])
      )
      id = 0
    }
  }

  return { createState, getState, removeState, destroyed }
})()

export const { createState, getState, removeState, destroyed } = Store
