import { createDep } from './deps'
import { isArray, isObject } from '../utils/typeOf'

export function reactive<T>(obj: any): any {
  const targetMap = new WeakMap()
  return new Proxy(obj, {
    get(target, key: string, receiver) {
      let depMap = targetMap.get(target)
      if (!targetMap.has(target)) {
        targetMap.set(target, (depMap = new Map()))
      }
      const res = Reflect.get(target, key, receiver)
      if (!depMap.has(key)) {
        depMap.set(key, createDep())
      }
      if (isObject(target[key]) || isArray(target[key])) {
        return reactive(res)
      }
      console.log(depMap.get(key))
      return res
    },
    set(target, key, value, receiver) {
      console.log(arguments)
      if (target[key] !== value) {
        console.log(targetMap.get(target)?.get(key))
        //targetMap.get(target)?.get(key)?.notify()
      }
      return Reflect.set(target, key, value, receiver)
    },
  })
}
