import Dep from './deps'
import { Sub } from '../types/observer'
import { queueWatcher } from './scheduler'
import { isArray, isObject } from '../utils/typeOf'
import { State } from '../types/store'
import { getState } from '../store'

let id = 0
export default class Watcher {
  state: State
  watcher: Sub
  dep: string[] = []
  id: number

  constructor(subs: Sub, state: State) {
    this.id = ++id
    if (isObject(subs)) {
      const { dep, sub } = subs
      this.dep = dep
      this.watcher = sub
    } else {
      this.watcher = subs
    }
    this.state = state
    this.getter()
  }

  getter(): void {
    this.watcher.apply(this.state, getDepsValue(this.dep, this.state))
  }

  update(): void {
    queueWatcher(this)
  }

  addDep(dep: Dep): void {
    dep.addSub(this)
  }
}

export function createWatcher<T>(subs: Sub | Sub[]): void {
  const state = getState()
  if (isArray(subs)) {
    subs.flat().forEach((sub) => new Watcher(sub, state))
  } else {
    new Watcher(subs, state)
  }
}

function getDepsValue(deps: string[], state: State) {
  return deps.map((dep) =>
    dep.split('.').reduce((child, key) => child[key], state as any)
  )
}

export function subscribe<T>(sub: Sub, ...deps: string[][]): any {
  return deps.map((dep) => ({
    sub,
    dep,
  }))
}
