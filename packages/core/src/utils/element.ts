import { has, isArray, isFunc, isString } from './typeOf'
import { on } from './event'
import {
  _EventListener,
  CreateElement,
  CreateElementOptions,
  eventHandler,
  eventType,
  Handler,
  PartialAtLeastOne,
} from '../_types/utils'
import { State } from '../_types/store'
import { effect } from '../reactive/effect'
import { setClasses } from './attribute'
import { SvgName } from '../_types/element'
import { resetHoverColor } from './theme'
import { Callback } from '../_types/core'
import { objectKeys } from './objectKeys'

function getHandler(el: HTMLElement, state: State): Partial<Handler> {
  return {
    event(val) {
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
    children(val, componentType) {
      val.forEach((child) =>
        el.appendChild(createElement(child, state, componentType))
      )
    },
    class: (val) => {
      if (isArray(val)) {
        setClasses(el, val.join(' '))
      } else {
        effect(() => {
          setClasses(el, val())
        }, state)
      }
    },
    style: (val) => {
      objectKeys(val).forEach((key) => {
        const style = val[key]
        if (isFunc(style)) {
          effect(() => {
            el.style[key] = style(state)
          }, state)
        } else {
          el.style[key] = style as string
        }
      })
    },
    text(val) {
      if (isString(val)) {
        el.innerText = val
      } else {
        effect(() => {
          el.innerText = String(val.call(state))
        }, state)
      }
    },
    watch(val) {
      val.flat().forEach((v) => effect(v, state))
    },
  }
}

const svgName: SvgName = {
  monthIcon: [
    'M721.9968 979.0208l47.0528-47.104-419.94752-419.98848 419.94752-419.90144-47.05792-47.04768-419.93216 419.89632h-0.00512l-47.104 47.09888 47.04768 47.04256z',
  ],
  yearIcon: [
    'M176 513.7l392.73-395.44a32 32 0 0 0-45.41-45.1L108 491.3a32 32 0 0 0 0.16 45.25L523.48 949a32 32 0 1 0 45.1-45.41z',
    'M525.23 513.7L918 118.26a32 32 0 1 0-45.41-45.1L457.27 491.3a32 32 0 0 0 0.16 45.25L872.7 949a32 32 0 0 0 45.1-45.41z',
  ],
}

export function createEL(
  tagName: CreateElementOptions['name'] = 'div'
): HTMLElement {
  if (has(objectKeys(svgName), tagName)) return createSVG(tagName)
  return document.createElement(tagName)
}

export default function createSVG(name: keyof SvgName): HTMLElement {
  const url = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(url, 'svg')
  svg.setAttribute('viewBox', '0 0 1024 1024')
  svgName[name].forEach((item) => {
    const path = document.createElementNS(url, 'path')
    path.setAttribute('d', item)
    svg.appendChild(path)
  })
  return svg as unknown as HTMLElement
}

export function createElement(
  opt: PartialAtLeastOne<CreateElementOptions> | CreateElement,
  state: State,
  componentType: 'start' | 'end' = 'start'
): HTMLElement {
  if (isFunc<PartialAtLeastOne<CreateElementOptions>>(opt)) {
    return createElement(opt(state, componentType), state, componentType)
  }
  const el = createEL(opt.name)
  const handlers = getHandler(el, state)
  // 确保 watch 是最先执行， children 是最后执行
  objectKeys(opt)
    .sort()
    .reverse()
    .forEach((key) => {
      const handler = handlers[key]
      if (isFunc(handler)) {
        handler(opt[key as never], opt.componentType ?? componentType)
      }
    })
  return el
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

export function isElementShow(vis: boolean): 'none' | '' {
  return vis ? '' : 'none'
}
