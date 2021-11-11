import Dep from './deps'
import { State } from '../types/store'
import { isArray, isObject } from '../utils/typeOf'
import { Callback } from '../types/core'
import { objectKeys } from '../utils/objectKeys'

export default function ObserveState(state: State): State {
  const get = (dep: Dep) => {
    if (Dep.target) dep.depend()
  }
  const set = (dep: Dep) => dep.notify()
  return reactive(state, {}, set, get)
}

export function reactive(
  state: State,
  target: any,
  setCb?: Callback,
  getCb?: Callback
): State {
  const stack = new Map()

  function observe<T = State>(obj: T): T {
    return defineReactive<T>(obj)
  }

  function defineReactive<T>(obj: any) {
    return new Proxy(obj, {
      get(target, propKey: string, receiver) {
        if (!stack.has(propKey)) {
          stack.set(propKey, new Dep())
        }
        getCb?.(stack.get(propKey))
        return Reflect.get(target, propKey, receiver)
      },
      set(target, propKey, value, receiver) {
        if (value === val) return
        return Reflect.set(target, propKey, value, receiver)
      },
    })
  }

  function createDep(key: string) {
    return new Dep()
  }
  return observe(state)
}
