import { mutableHandlers } from './handler'

export function reactive(target: any): ProxyHandler<any> {
  return new Proxy(target, mutableHandlers)
}
