import { createState, removeState } from '../store'
import { State } from '../types/store'
import { createPicker } from './create-picker'
import { BetterPicker, BetterPickerInstance } from '../types/core'
import { getEventListener } from '../utils/event'
import { listenToScrollParents } from '../utils/listenToParents'
import clickOutside from '../utils/clickoutside'
import { Off } from '../types/event'
import { Bind } from '../utils/bind'
import { getDate } from '../utils/date'

export default function Picker(): BetterPicker {
  let state: State
  let onRef, offRef: Off, onBody, offBody: Off

  function openPopover() {
    if (state) state.visible = true
  }

  function changePopoverVisible() {
    if (!state.reference) return
    ;[onRef, offRef] = getEventListener(state.reference)
    ;[onBody, offBody] = getEventListener(document.body)
    onRef(openPopover)
    onBody(Bind(clickOutside, state))
    if (state) listenToScrollParents(state)
  }

  function getCurrentDate() {
    return getDate(state)
  }

  function update(options: Partial<State>) {
    state = Object.assign(state, options)
  }

  function removePopover(): void {
    const { popover } = state
    if (!popover) return
    const parent = popover.parentNode
    if (parent && parent.removeChild) {
      parent.removeChild(popover)
    }
  }

  function destroyed() {
    removePopover()
    offBody()
    offRef()
    removeState(state.id)
  }

  function create(options: Partial<State>): void {
    state = Object.assign(createState(options), {
      update,
      destroyed,
    })
    changeWeekFormat()
    changePopoverVisible()
    createPicker(state)
  }

  function clear(): void {
    if (state.reference) {
      state.reference.value = ''
      state.range.start = state.range.end = null
      // state.start.date =
      // state.end.date =
      //   null
    }
  }

  function open(): void {
    state.visible = true
  }

  function close(): void {
    state.visible = false
  }

  function changeWeekFormat() {
    // TODO if (state.type === 'week' && (!userConfig || !userConfig.format))
    if (state.type === 'week') {
      state.format = state.locale.weekFormat
    }
  }

  return function (options: Partial<State>): BetterPickerInstance {
    create(options)
    return {
      id: state.id,
      state,
      getCurrentDate,
      update,
      destroyed,
      clear,
      open,
      close,
    }
  }
}
