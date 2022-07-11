import { State } from '../types/store'
import { createElement, isElementShow } from '../utils/element'
import { Header } from '../components/header'
import { Day } from '../components/date&week'
import { Month, Year } from '../components/month&year'
import {
  createMonthOrYearComponentsFunction,
  PickerConfigMap,
} from '../types/components'
import mixins from '../watch/mixins'
import {
  panelLinkage,
  updateDayCell,
  updateMonthCell,
  updateYearCell,
} from '../watch/cells'
import { concat } from '../utils/extend'
import { CreateElement, CreateElementRequiredOptions } from '../types/utils'

function rangeComponent(
  child: createMonthOrYearComponentsFunction[]
): (CreateElementRequiredOptions | CreateElement)[] {
  const children = createComponent(child)
  return [
    {
      class: ['range-wrapper'],
      children: [
        {
          children,
          class: ['range-left'],
          componentType: 'start',
        },
        {
          children,
          class: ['range-right'],
          style: {
            display: (state: State) =>
              isElementShow(
                state.type === 'date-range' && state.mode === 'date'
              ),
          },
          componentType: 'end',
        },
      ],
    },
  ]
}

function createComponent(
  children: (CreateElementRequiredOptions | CreateElement)[]
): (CreateElementRequiredOptions | CreateElement)[] {
  return [
    Header,
    {
      class: ['content'],
      children,
    },
  ]
}

const updateDMY = () => [updateYearCell, updateMonthCell, updateDayCell]
const pickersMap: PickerConfigMap = {
  date: {
    children: createComponent([Day, Month, Year]),
    watch: updateDMY(),
  },
  'date-range': {
    watch: concat(updateDMY(), panelLinkage),
    children: rangeComponent([Day, Month, Year]),
  },
  'date-week': {
    children: rangeComponent([Day, Month, Year]),
    watch: updateDMY(),
  },
  month: {
    children: [Header, Month, Year],
    watch: [updateMonthCell, updateYearCell],
  },
  'month-range': {
    children: rangeComponent([Month]),
    watch: [updateMonthCell, panelLinkage],
  },
  year: {
    children: [Header, Year],
    watch: [updateYearCell],
  },
  'year-range': {
    children: rangeComponent([Year]),
    watch: [updateYearCell, panelLinkage],
  },
}

export function createPicker(state: State): void {
  const { children, watch } = pickersMap[state.type]
  state.popover = createElement(
    {
      class: state.classes.concat(['wrapper']),
      children,
      hidden: true,
      style: {
        display: 'inline-block',
        position: 'absolute',
        zIndex: state.zIndex,
      },
      watch: watch.concat(mixins),
    },
    state
  ) as HTMLElement
}
