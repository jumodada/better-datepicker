import { has } from './typeOf'

export function isNative(Ctor: unknown): boolean {
  return typeof Ctor === 'function' && has(Ctor.toString(), 'native code')
}
