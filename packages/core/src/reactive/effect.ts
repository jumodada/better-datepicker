import { createDep } from './dep'
import { queueWatcher } from './scheduler'
import { Fn, UtilObject } from '../types/utils'
import { getState } from '../store'

export let activeEffect: null | Fn = null

export const targetMap = new WeakMap<UtilObject>()

export function track(target: UtilObject, key: keyof UtilObject): void {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = createDep()
    depsMap.set(key, deps)
  }
  if (activeEffect) {
    deps.add(activeEffect)
  }
}

export function trigger(target: UtilObject, key: keyof UtilObject): void {
  let depsMap = targetMap.get(target)
  if (!depsMap) depsMap = targetMap.set(target, new Map<string, Set<Fn>>())
  if (!depsMap.get(key)) depsMap.set(key)
  const deps: Fn[] = depsMap.get(key)
  deps.forEach((dep) => {
    queueWatcher(dep)
  })
}

export function effect(fn: Fn): void {
  const state = getState()
  activeEffect = fn
  fn.call(state)
  activeEffect = null
}
