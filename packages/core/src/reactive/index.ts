import { mutableHandlers } from './handler'

export function reactive(target: any) {
  return new Proxy(target, mutableHandlers)
}
