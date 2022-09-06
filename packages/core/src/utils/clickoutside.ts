import { State } from '../_types/store'
import { _Event } from '../_types/event'

export default function clickOutside(state: State, e: _Event): void {
  const { visible, reference, popover } = state
  if (!visible || reference?.contains(e.target) || popover?.contains(e.target))
    return
  state.visible = false
}
