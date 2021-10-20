import Watcher from './watcher'

export default class Dep {
  static target: Watcher | null
  subs: Watcher[]
  constructor() {
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
