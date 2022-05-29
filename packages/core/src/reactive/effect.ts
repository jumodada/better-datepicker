import { createDep } from './dep'
import { queueWatcher } from './scheduler'
import { Fn, UtilObject } from '../types/utils'

export let activeEffect: null | Fn = null

export const targetMap = new WeakMap<UtilObject, any>()

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
  const deps = depsMap.get(key)
  deps.forEach((dep) => {
    queueWatcher(dep)
  })
}

export function effect(fn: Fn): void {
  activeEffect = fn
  fn()
  activeEffect = null
}
