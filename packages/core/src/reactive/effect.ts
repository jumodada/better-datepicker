import { createDep } from './dep'
import { queueWatcher } from './scheduler'
import { Fn, UtilObject } from '../types/utils'
import { getState } from '../store'
import { State } from '../types/store'
import { isFunc } from '../utils/typeOf'

export let activeEffect: null | Fn = null

export const targetMap = new WeakMap<UtilObject>()

export function track(target: UtilObject, key: keyof UtilObject): void {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    depsMap = new Map<string, Set<Fn>>()
    targetMap.set(target, depsMap)
  }

  let deps: Set<Fn> = depsMap.get(key)
  if (!deps) {
    deps = createDep()
    depsMap.set(key, deps)
  }
  if (activeEffect) {
    deps.add(activeEffect)
  }
}

export function trigger(target: UtilObject, key: keyof UtilObject): void {
  const deps: Set<Fn> = targetMap.get(target)?.get(key)
  if (!deps) return
  deps.forEach((dep) => {
    queueWatcher(dep)
  })
}

export function effect(fn: Fn): void {
  const state = getState()
  fn = fn.bind(state)
  activeEffect = fn
  const res = fn()
  activeEffect = null
  if (isFunc(res)) {
    res()
  }
}

function getDepsValue(deps: string[], state: State) {
  return deps.map((dep) =>
    dep.split('.').reduce((child, key) => child[key as never], state)
  )
}

export function useEffect(fn: Fn, ...depsArray: string[][]): Fn {
  return function () {
    depsArray.forEach((deps) => {
      effect(function () {
        const getter = () => getDepsValue(deps, this)
        const run = () => fn.apply(this, getter())
        activeEffect = run
        getter()
        return run
      })
    })
  }
}
