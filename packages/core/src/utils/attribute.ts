import { objectKeys } from './objectKeys'
import { addLogo } from './merge'

export function setClasses(el: HTMLElement | Element, val: string): void {
  el.setAttribute(
    'class',
    val
      .split(' ')
      .map((name) => addLogo(name))
      .join(' ')
  )
}

export function classNames(
  names: string,
  config: {
    [key: string]: () => boolean
  } = {}
): () => string {
  return () => {
    return objectKeys(config).reduce((classNames: string, key) => {
      return config[key]() ? `${classNames} ${key}` : classNames
    }, names)
  }
}

export function styleNames(
  styles: {
    [key: string]: boolean
  } = {}
): () => string {
  return () =>
    objectKeys(styles).reduce((stylesName: string, sty) => {
      return stylesName.concat(`${sty}:${styles[sty]}`)
    }, '')
}
