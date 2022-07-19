import { objectKeys } from './objectKeys'
import { isNotObject } from './typeOf'

export function concat<A>(target: A[], source: any[]): any[] {
  return target.concat(source)
}

export function extend<T, S>(target: T, source: S): T & S {
  return Object.assign(target, source)
}

export function mergePrimitiveValues<T, S>(target: T, source: S): T & S {
  const primitiveValuesFromSource = objectKeys(source).reduce((obj, key) => {
    const value = source[key]
    if (isNotObject(value)) {
      obj[key] = value
    }
    return obj
  }, {} as S)
  return Object.assign({}, target, primitiveValuesFromSource)
}

export function merge<T, S>(target: T, source: S): T & S {
  return Object.assign({}, target, source)
}
