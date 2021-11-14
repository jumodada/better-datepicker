import { isArray, isFunc, isString } from './typeOf'
import { on } from './event'
import {
  CreateElementOptions,
  updateOptions,
  eventHandler,
  eventType,
  Handler,
  _EventListener,
  CreateElement,
  PartialAtLeastOne,
} from '../types/utils'
import { State } from '../types/store'
import { addWatch } from '../observer/watcher'
import { addAttr, resetAttr, transformStyle } from './attribute'
import { mergeClasses } from './merge'
import { UpdateCbType } from '../types/components'
import { SvgName } from '../types/element'
import { resetHoverColor, resetSelectColor } from './theme'
import { Callback } from '../types/core'
import { Sub } from '../types/observer'
import { objectKeys } from './objectKeys'

const handler: Handler = {
  event(el, val, state) {
    const { themeColor } = state
    function addListener(listener: _EventListener[] | Callback): void {
      if (isArray<{ name: eventType; handler: eventHandler }>(listener)) {
        listener.forEach((e) => on(el, e.handler, e.name, state))
      } else {
        on(el, listener, 'click', state)
      }
    }
    addListener(val)
    if (themeColor) {
      resetHoverColor(el, themeColor)
    }
  },
  children(el, val, state) {
    val.forEach((child) => el.appendChild(createElement(child, state)))
  },
  class: (el, val, state) => update.call(state, el, val, 'cls'),
  style: (el, val) => addAttr(el, transformStyle(val), 'style'),
  name: (el, val, state) => {
    const color: string | undefined = state[(val + 'Color') as 'thColor']
    if (color) addAttr(el, { color }, 'style')
  },
  text(el, val, state) {
    if (isString(val)) {
      el.innerText = val
    } else {
      update.call(state, el, val)
    }
  },
  hidden: (el, val) => hidden(el, val),
  $style(el, val, state) {
    objectKeys(val).forEach((key) => {
      update.call(state, el, val[key] as Sub<string>, 'style', key)
    })
  },
}

export function createEL(tagName = 'div'): HTMLElement {
  return document.createElement(tagName)
}

const svgName: SvgName = {
  month: [
    'M721.9968 979.0208l47.0528-47.104-419.94752-419.98848 419.94752-419.90144-47.05792-47.04768-419.93216 419.89632h-0.00512l-47.104 47.09888 47.04768 47.04256z',
  ],
  year: [
    'M176 513.7l392.73-395.44a32 32 0 0 0-45.41-45.1L108 491.3a32 32 0 0 0 0.16 45.25L523.48 949a32 32 0 1 0 45.1-45.41z',
    'M525.23 513.7L918 118.26a32 32 0 1 0-45.41-45.1L457.27 491.3a32 32 0 0 0 0.16 45.25L872.7 949a32 32 0 0 0 45.1-45.41z',
  ],
}

export default function createSVG(name: string): HTMLElement {
  const url = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(url, 'svg')
  svg.setAttribute('viewBox', '0 0 1024 1024')
  svgName[name as 'month'].forEach((item: string) => {
    const path = document.createElementNS(url, 'path')
    path.setAttribute('d', item)
    svg.appendChild(path)
  })
  return svg as unknown as HTMLElement
}

export function createElement(
  opt: PartialAtLeastOne<CreateElementOptions> | CreateElement,
  state: State
): Node {
  if (isFunc<PartialAtLeastOne<CreateElementOptions>>(opt)) {
    return createElement(opt.call(state), state)
  }
  const el =
    opt.name === 'svg' ? createSVG(opt.text as string) : createEL(opt.name)
  objectKeys(opt).forEach((key) => {
    handler[key](el, opt[key as never], state)
  })
  return el
}

export function hidden(el: HTMLElement, vis: boolean): void {
  if (!vis) return
  el.style.display = 'none'
}

export function appendChild(
  children: Element | Element[],
  parent: HTMLElement | undefined = document.body
): void {
  if (isArray(children)) {
    children.forEach((child) => parent.appendChild(child))
  } else {
    parent.appendChild(children)
  }
}

export function visible(vis: boolean): 'none' | '' {
  return vis ? '' : 'none'
}

export function update<T>(
  this: State,
  el: HTMLElement,
  opt: Sub<string> | updateOptions | string[],
  type: keyof UpdateCbType = 'text',
  styKey?: string
): void {
  if (isArray(opt)) return resetAttr(el, mergeClasses(opt))
  const callbacks: UpdateCbType = {
    cls: (res: string) => {
      const classes = mergeClasses(res, (opt as updateOptions).static)
      resetAttr(el, classes)
      resetSelectColor(el, this, classes)
    },
    text: (res: string) => (el.innerText = res),
    style: (val: string) => (el.style[styKey as 'color'] = val),
  }

  addWatch(() => {
    const cb = 'cb' in opt ? opt.cb : opt
    callbacks[type](cb.call(this))
  })
}
