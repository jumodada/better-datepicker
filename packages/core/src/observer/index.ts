import Dep from './deps'
import { State } from '../types/store'
import { isObject } from '../utils/typeOf'

export function reactive(state: State): State {
  const depMap = new Map()

  function defineReactive<T>(obj: any): any {
    return new Proxy(obj, {
      get(target, key: string, receiver) {
        const res = Reflect.get(target, key, receiver)
        if (!depMap.has(key)) {
          depMap.set(key, new Dep())
        }
        if (Dep.target) depMap.get(key).depend()
        if (isObject(target[key])) {
          return defineReactive(res)
        }
        return res
      },
      set(target, key, value, receiver) {
        if (target[key] !== value) {
          depMap.get(key)?.notify()
        }
        return Reflect.set(target, key, value, receiver)
      },
    })
  }
  return defineReactive(state)
}
