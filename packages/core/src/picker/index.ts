import { createState } from './create-state'
import { State } from '../_types/store'
import { createPicker } from './create-picker'
import { BetterPicker, BetterPickerInstance } from '../_types/core'
import { useEventListener } from '../utils/event'
import { listenToScrollParents } from '../utils/listenToParents'
import clickOutside from '../utils/clickoutside'
import { Off } from '../_types/event'
import { Bind } from '../utils/bind'
import { findInputElement } from '../utils/findInputElement'
import { extend } from '../utils/extend'

export default function Picker(): BetterPicker {
  let state: State
  let onRef, offRef: Off, onBody, offBody: Off

  function open() {
    state.visible = true
  }

  function mounted() {
    const { reference } = state
    if (!reference) return
    if (!(reference instanceof HTMLInputElement)) {
      state.reference = findInputElement(reference)
    }
    ;[onRef, offRef] = useEventListener(state.reference as HTMLElement)
    ;[onBody, offBody] = useEventListener(document.body)
    onRef(open)
    onBody(Bind(clickOutside, state))
    if (state) listenToScrollParents(state)
    createPicker(state)
  }

  function update(options: Partial<State>) {
    extend(state, options)
  }

  function removePopover(): void {
    const { popover } = state
    if (!popover) return
    const parent = popover.parentNode
    if (parent && parent.removeChild) {
      parent.removeChild(popover)
      state.popover = null
    }
  }

  function destroyed() {
    removePopover()
    offBody()
    offRef()
    state = null!
  }

  function create(options: Partial<State>): void {
    state = extend(createState(options), {
      create,
      update,
      destroyed,
    })
    mounted()
  }

  function clear(): void {
    if (state.reference) {
      state.reference.value = ''
      state.hoverSelected.start = state.hoverSelected.end = null
      // state.start.date = state.end.date = null
    }
  }

  return function (options: Partial<State>): BetterPickerInstance {
    create(options)
    return {
      state,
      update,
      destroyed,
      clear,
    }
  }
}
