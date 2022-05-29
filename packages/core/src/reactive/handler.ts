import { reactive } from './index'
import { isObject } from '../utils/typeOf'
import { track, trigger } from './effect'

const get = createGetter()

function createGetter() {
  return function get(target: any, key: string, receiver: any) {
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  }
}

const set = createSetter()

function createSetter() {
  return function set(
    target: any,
    key: string,
    value: unknown,
    receiver: any
  ): boolean {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  }
}

export const mutableHandlers: ProxyHandler<any> = {
  get,
  set,
}
