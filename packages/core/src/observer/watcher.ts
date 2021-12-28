import Dep, { clearTarget, setTarget } from './deps'
import { Sub } from '../types/observer'
import { queueWatcher } from './scheduler'
import { isArray, isObject } from '../utils/typeOf'
import { State } from '../types/store'
import { getState } from '../store'

export default class Watcher {
  state: State
  watcher: Sub
  dep: string[] = []
  constructor(subs: Sub, state: State) {
    if (isObject(subs)) {
      const { dep, sub } = subs
      this.watcher = sub
      this.dep = dep
    } else {
      this.watcher = subs
    }
    this.state = state
    setTarget(this)
    this.getter()
  }

  getter(): void {
    const val = getDepsValue(this.dep)
    this.watcher.apply(this.state, val)
    clearTarget()
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

function getDepsValue(deps: string[]) {
  return deps.map((dep) =>
    dep.split('.').reduce((child, key) => child[key], getState() as any)
  )
}

export function subscribe<T>(sub: Sub, ...deps: string[][]): any {
  return deps.map((dep) => ({
    sub,
    dep,
  }))
}
