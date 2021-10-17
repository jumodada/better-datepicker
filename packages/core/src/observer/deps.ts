import { State } from '../types/store'
import Watcher from './watcher'

let uid = 0

export default class Dep<T = State> {
  static target: any
  id: number
  subs: Watcher[]
  constructor() {
    this.id = uid++
    this.subs = []
  }

  addSub(sub: Watcher): void {
    this.subs.push(sub)
  }

  depend(): void {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify(): void {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

Dep.target = null

export function setTarget(target: Watcher): void {
  Dep.target = target
}

export function clearTarget(): void {
  Dep.target = null
}
