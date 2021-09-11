import Options, { PickerOptions } from '../../types/options'
import { mergeOptions } from '../../utils/merge'

function createOptions(): Options {
  return {
    placement: 'bottom',
    placeholder: '',
    type: 'date',
    zIndex: 2000,
    unlinkPanels: false,
    format: 'yyyy/MM/dd',
    offset: 12,
    insertTo: 'body',
    binding: true,
    disabled: false,
    disabledDate: null,
    themeColor: '',
    rangeBgColor: '',
    tdColor: '',
    thColor: '',
    style: {},
    classes: [],
  }
}

export function changeOpt(target: PickerOptions): void {
  mergeOptions(createOptions(), target)
}

function defaultOptions(): Options {
  return createOptions()
}

export default defaultOptions
