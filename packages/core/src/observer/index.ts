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
  function observe<T = State>(obj: T): T {
    objectKeys(obj).forEach((key) => {
      const val = obj[key]
      if (isArray(val)) {
        val.forEach((v) => {
          if (isObject(v)) observe(v)
        })
      } else if (isObject(val)) {
        observe(val)
      } else {
        defineReactive<T>(obj, key, val)
      }
    })
    return obj
  }

  function defineReactive<T>(obj: T, key: keyof T, val: unknown) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        getCb?.(dep)
        return val
      },
      set(newVal) {
        if (newVal === val) return
        target[key] = val = newVal
        setCb?.(dep)
      },
    })
  }
  return observe(state)
}
