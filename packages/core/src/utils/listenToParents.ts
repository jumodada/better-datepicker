import { getScrollParents } from './window'
import { setPopoverLocation } from '../picker/update-picker'
import { State } from '../types/store'
import { on } from './event'

export function listenToScrollParents(state: State): void {
  const scrollParents = getScrollParents(state.reference)
  const _bind = setPopoverLocation.bind(state)
  scrollParents.forEach((el) => on(el, _bind, 'scroll'))
  on(window, _bind, 'resize')
}
