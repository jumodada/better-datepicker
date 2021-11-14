import { logo } from './classes'
import { isArray, has } from './typeOf'

export function mergeOptions<S>(source: S, target = Object.create(null)): S {
  for (const key in source) {
    const val = target[key]
    if (typeof val !== 'undefined') {
      source[key] = val
    }
  }
  return source
}

function addLogo(str: string) {
  return has(str, logo) ? str : logo + '-' + str
}

export function mergeClasses(
  ...args: (string | string[] | undefined)[]
): string {
  return args
    .filter((item) => item)
    .map((arg) =>
      isArray(arg) ? mergeClasses(...arg) : addLogo(arg as string)
    )
    .join(' ')
}
