import { Sub } from './reactive'
import { CellsData } from './store'

export interface UtilObject {
  [key: string]: any
}

export type DateType = string | Date | null

export interface Fn {
  (...arg: any): unknown
}

export type PartialAtLeastOne<
  T,
  U = { [K in keyof T]: Pick<T, K> }
> = Partial<T> & U[keyof U]

export interface Types {
  Number: string
  String: string
  Function: string
  Array: string
  Date: string
  Object: string
  Boolean: string
  Map: string
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
  background?: string
  margin?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  padding?: string
  position?: 'relative' | 'absolute'
  left?: string
  right?: string
  top?: string
  bottom?: string
  cursor?: 'default' | 'pointer'
  transform?: string
  textAlign?: string
  display?: 'inline-block' | 'none' | 'block' | ''
  borderRight?: string
  zIndex?: number
}

export type StyleOption = {
  [key in keyof Style]: Style[key] | (() => Style[key])
}

export interface CreateElement {
  (...arg: any): PartialAtLeastOne<CreateElementOptions>
}

export type DynamicStyle = PartialAtLeastOne<{
  display: Sub
  color: Sub
  background: Sub
}>

export type CreateElementRequiredOptions =
  PartialAtLeastOne<CreateElementOptions>

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
    | 'yearIcon'
    | 'monthIcon'
  text: string | Sub
  class: any
  event: eventHandler | _EventListener[]
  style: StyleOption
  children: (CreateElementRequiredOptions | CreateElement)[]
  hidden: boolean
  componentType: 'start' | 'end'
  watch: (() => void)[]
}

interface HandlerCb<V> {
  (val: V, componentType: 'start' | 'end'): void
}

export type Handler = {
  [K in keyof CreateElementOptions]: HandlerCb<CreateElementOptions[K]>
}

export interface WeekRange {
  start: CellsData['date']
  end: CellsData['date']
}
