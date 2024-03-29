import { _EventListener, eventType, Handler } from '../_types/event'
import { State } from '../_types/store'
import { isDisabledDate } from './date'
import { isObject } from './typeOf'

export function useEventListener(
  el: HTMLElement | Window,
  eventName: eventType = 'click'
): _EventListener {
  let eventHandler: (e: Event) => unknown

  function _on(handler: Handler, state?: State): void {
    eventHandler = on(el, handler, eventName, state)
  }

  function _off(): void {
    el.removeEventListener(eventName, eventHandler)
  }

  return [_on, _off]
}

export function on(
  el: HTMLElement | Window,
  handler: Handler,
  eventName: eventType = 'click',
  state?: State,
  arg?: unknown
): (e: Event) => unknown {
  function listener(e: Event) {
    if (
      isObject(arg) &&
      arg.date &&
      state &&
      isDisabledDate(state, (arg as any).date)
    )
      return
    return handler.call(state, e)
  }

  el.addEventListener(eventName, listener)
  return listener
}
