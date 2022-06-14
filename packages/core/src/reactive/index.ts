import { mutableHandlers } from './handler'
import { isObjectOrArray } from '../utils/typeOf'

export function reactive(target: any): any {
  if (!isObjectOrArray(target)) return target
  return new Proxy(target, mutableHandlers)
}
