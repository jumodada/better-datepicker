import { Sub } from './observer'
import { State } from './store'

export interface UtilObject {
  [key: string]: unknown
}

export type DateType = string | Date | null

export interface Fn {
  (...arg: never): unknown
}

export interface Types {
  Number: string
  String: string
  Function: string
  Array: string
  Date: string
  Object: string
  Boolean: string
}

export interface Rect<T = number> {
  width: T
  height: T
  left: T
  top: T
}

export interface Transform<T = string> {
  top: T
  left: T
  bottom: T
  right: T
}

export type eventType = 'click' | 'mouseenter' | 'mouseleave' | 'focus'

export type eventHandler = (...arg: any) => unknown

export interface _EventListener {
  name: eventType
  handler: eventHandler
}

export interface Style {
  height?: string
  width?: string
  float?: 'left' | 'right'
  color?: string
  backgroundColor?: string
  margin?: string
  'margin-left'?: string
  'margin-right'?: string
  'margin-top'?: string
  'margin-bottom'?: string
  padding?: string
  position?: 'relative' | 'absolute'
  left?: string
  right?: string
  top?: string
  bottom?: string
  cursor?: 'default' | 'pointer'
  transform?: string
  'text-align'?: string
  display?: 'inline-block' | 'none' | 'block'
  'border-right'?: string
  'z-index'?: number
}

export interface CreateElement {
  (...arg: any): Required<CreateElementOptions>
}

export interface updateOptions {
  static?: string[]
  cb: Sub<string>
}

export type DynamicStyle = Required<{
  display?: Sub<string>
  color?: Sub<string>
  background?: Sub<string>
}>

export type CreateElementRequiredOptions = Required<CreateElementOptions>

export interface CreateElementOptions {
  name:
    | 'span'
    | 'div'
    | 'ul'
    | 'li'
    | 'input'
    | 'svg'
    | 'table'
    | 'tr'
    | 'th'
    | 'td'
    | 'thead'
    | 'tbody'
    | 'i'
  text: string | Sub<string>
  class: updateOptions | string[] | Sub<string>
  event: eventHandler | _EventListener[]
  style: Style
  $style: DynamicStyle
  children: (CreateElementRequiredOptions | CreateElement)[]
  hidden: boolean
}

interface HandlerCb<V> {
  (el: HTMLElement, val: V, state: State): void
}

export type Handler = {
  [K in keyof CreateElementOptions]: HandlerCb<CreateElementOptions[K]>
}

export interface WeekRange {
  start: Date
  end: Date
}
