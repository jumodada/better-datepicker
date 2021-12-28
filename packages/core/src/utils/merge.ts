import { logo } from './prefixName'
import { isArray, has } from './typeOf'

export function addLogo(str: string): string {
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
