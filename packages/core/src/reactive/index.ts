import { mutableHandlers } from './handler'
import { isObjectOrArray } from '../utils/typeOf'

const proxyMap = new WeakMap()

export function reactive(target: any): any {
  if (proxyMap.has(target)) return proxyMap.get(target)
  if (!isObjectOrArray(target)) return target
  const proxy = new Proxy(target, mutableHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
