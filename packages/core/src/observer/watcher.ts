import Dep, { clearTarget, setTarget } from './deps'
import { Sub } from '../types/observer'
import { queueWatcher } from './scheduler'
import { isArray, isFunc } from '../utils/typeOf'
import { State } from '../types/store'
import { getState } from '../store'

let id = 0
export default class Watcher {
  id: number
  state: State
  watcher: Sub
  constructor(watcher: Sub, state: State) {
    this.watcher = watcher
    this.id = ++id
    this.state = state
    setTarget(this)
    this.getter()
  }

  getter(): void {
    const val = this.watcher.call(this.state)
    if (isFunc(val)) this.watcher = val
    clearTarget()
  }

  update(): void {
    queueWatcher(this)
  }

  addDep(dep: Dep): void {
    dep.addSub(this)
  }
}

function watch<T>(sub: Sub<T>, state: State) {
  new Watcher(sub, state)
}

export function addWatch<T>(subs: Sub<T> | Sub<T>[]): void {
  const state = getState()
  if (isArray(subs)) {
    subs.forEach((sub) => watch(sub, state))
  } else {
    watch(subs, state)
  }
}
