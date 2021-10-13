import Options from '../types/options'
import { findInputElement } from '../utils/findInputElement'
import { createState, removeState } from '../store'
import { mergeOptions } from '../utils/merge'
import { watch } from './watch'
import { State } from '../types/store'
import { createPopover } from './dom/create-popover'
import { isFunc } from '../utils/typeOf'
import { destroyHook, getDate } from './util/method'
import { BetterPicker, BetterPickerInstance, Callback } from '../types/core'
import { getEventListener } from '../utils/event'
import { listenToScrollParents } from '../utils/listenToParents'
import clickOutside from '../utils/clickoutside'
import { Off } from '../types/event'
import defaultOptions from './util/default-options'
import { Bind } from '../utils/bind'

export default function Picker(): BetterPicker {
  let state: State,
    reference: HTMLInputElement,
    opt: Options,
    userConfig: Partial<Options> | undefined
  let onRef, offRef: Off, onBody, offBody: Off

  function openPopover() {
    if (state) state.visible = true
  }

  function addListener() {
    ;[onRef, offRef] = getEventListener(reference)
    ;[onBody, offBody] = getEventListener(document.body)
    onRef(openPopover)
    onBody(Bind(clickOutside, state))
    if (state) listenToScrollParents(reference, state)
  }

  function getCurrentDate() {
    return getDate(state)
  }

  function onChange(cb: Callback) {
    if (isFunc(cb)) {
      state.onChange = cb
    } else {
      console.error('Invalid argument provided. They must be a Function')
    }
  }

  function update(options: Partial<Options>) {
    if (options) userConfig = options
    opt = mergeOptions(opt, options)
    destroyed()
    create()
  }

  function destroyed() {
    destroyHook(state)
    offBody()
    offRef()
    removeState(state.id)
  }

  function create(): void {
    state = Object.assign(createState(opt), {
      update,
      destroyed,
      reference,
    })
    changeWeekFormat()
    watch(opt)
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
    if (state.options.type === 'week' && (!userConfig || !userConfig.format)) {
      state.options.format = state.locale.weekFormat
    }
  }

  return function (
    el: HTMLInputElement,
    options?: Partial<Options>
  ): BetterPickerInstance {
    reference = findInputElement(el)
    opt = mergeOptions(defaultOptions(), options)
    userConfig = options
    create()
    return {
      id: state.id,
      state,
      getCurrentDate,
      onChange,
      update,
      destroyed,
      clear,
      open,
      close,
    }
  }
}
