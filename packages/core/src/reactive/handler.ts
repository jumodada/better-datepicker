import { reactive } from './index'
import { isObjectOrArray } from '../utils/typeOf'
import { track, trigger } from './effect'
import { UtilObject } from '../types/utils'

const get = createGetter()

function createGetter() {
  return function get(target: UtilObject, key: string, receiver: UtilObject) {
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    if (isObjectOrArray(res)) {
      return reactive(res)
    }
    return res
  }
}

const set = createSetter()

function createSetter() {
  return function set(
    target: UtilObject,
    key: string,
    value: unknown,
    receiver: UtilObject
  ): boolean {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  }
}

export const mutableHandlers: ProxyHandler<UtilObject> = {
  get,
  set,
}
