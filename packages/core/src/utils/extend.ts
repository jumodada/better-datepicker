import { UtilObject } from '../types/utils'

export function concat<A>(a: A[], b: any[]): any[] {
  return a.concat(b)
}

export function extend(a: UtilObject, b: UtilObject): UtilObject {
  return Object.assign(a, b)
}
