import { createState, removeState } from '../store'
import { watch } from './watch'
import { State } from '../types/store'
import { createPopover } from './dom/create-popover'
import { destroyHook, getDate } from './util/method'
import { BetterPicker, BetterPickerInstance } from '../types/core'
import { getEventListener } from '../utils/event'
import { listenToScrollParents } from '../utils/listenToParents'
import clickOutside from '../utils/clickoutside'
import { Off } from '../types/event'
import { Bind } from '../utils/bind'

export default function Picker(): BetterPicker {
  let state: State
  let onRef, offRef: Off, onBody, offBody: Off

  function openPopover() {
    if (state) state.visible = true
  }

  function addListener() {
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

  function destroyed() {
    destroyHook(state)
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
    watch(state)
    addListener()
    createPopover(state)
  }

  function clear(): void {
    if (state.reference) {
      state.reference.value = ''
      state.range.start =
        state.range.end =
        state.start.date =
        state.end.date =
          null
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
