import { Types, UtilObject } from '../_types/utils'

const toString = Object.prototype.toString
const typeOf = (val: unknown, typeName: keyof Types) =>
  has(toString.call(val), typeName)

export function isObject<T = UtilObject>(val: unknown): val is T {
  return typeOf(val, 'Object')
}

export function isDate(val: unknown): val is Date {
  return typeOf(val, 'Date')
}

export function isFunc<T = string>(val: unknown): val is (...arg: any) => T {
  return typeOf(val, 'Function')
}

export const isObjectOrArray = (val: unknown): val is Record<any, any> =>
  isObject(val) || isArray(val)

export function isString(val: unknown): val is string {
  return typeOf(val, 'String')
}

export function isNotObject(val: unknown): boolean {
  return !(isObjectOrArray(val) || isFunc(val))
}

export function isArray<T = unknown>(val: unknown): val is T[] {
  return Array.isArray(val)
}

export function has<T extends string>(
  target: T[] | T,
  val: string | string[]
): val is T {
  if (isArray(val)) return val.some((v) => has(target, v))
  return target.indexOf(val as never) > -1
}

export function not(
  target: string | string[],
  val: string | string[]
): boolean {
  if (isArray(val)) return val.every((v) => !has(target, v))
  return !has(target, val)
}
