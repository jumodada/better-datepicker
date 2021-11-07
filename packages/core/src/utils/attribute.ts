import { Style } from '../types/utils'
import { isObject } from './typeOf'
import { objectKeys } from './objectKeys'

export function resetAttr(
  el: HTMLElement | Element,
  val: string,
  name = 'class'
): void {
  if (!val) return el.removeAttribute(name)
  el.setAttribute(name, val)
}

export function transformStyle(sty: Style): string {
  if (!sty) return ''
  return objectKeys(sty)
    .reduce((acc, key) => acc.concat(`${key}:${sty[key]}`), [''])
    .join(';')
}

export function addAttr(
  el: HTMLElement | Element,
  val: string | Style,
  name = 'class'
): void {
  if (!val) return
  let attr = el.getAttribute(name) || ''
  let _val = val
  if (isObject<Style>(val)) {
    _val = objectKeys(val)
      .filter((key) => val[key])
      .reduce((c, key) => c + key + ':' + val[key] + ';', '')
  }
  attr += ' ' + _val
  el.setAttribute(name, attr)
}
