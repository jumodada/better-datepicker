import { State } from '../types/store'
import { createElement, isElementShow } from '../utils/element'
import { Header } from '../components/header'
import { Day } from '../components/date&week'
import { Month, Year } from '../components/month&year'
import {
  createMonthOrYearComponentsFunction,
  PickerConfigMap,
} from '../types/components'
import { classNames } from '../utils/attribute'
import mixins from '../watch/mixins'
import {
  panelLinkage,
  updateDayCell,
  updateMonthCell,
  updateYearCell,
  // panelLinkage,
  // updateMonthCell,
  // updateYearCell,
  // updateDayCell,
} from '../watch/cells'
import { concat } from '../utils/extend'
import {
  CreateElement,
  CreateElementOptions,
  CreateElementRequiredOptions,
} from '../types/utils'
import { has } from '../utils/typeOf'

function rangeComponent(child: createMonthOrYearComponentsFunction) {
  const children = createComponent([child])
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
                state.type === 'date-range' && state.mode === 'day'
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

const pickersMap: PickerConfigMap = {
  date: {
    children: concat(createComponent([Day]), [Month, Year]),
    watch: [updateYearCell, updateMonthCell, updateDayCell],
  },
  'date-range': {
    children: concat(rangeComponent(Day), [Month, Year]),
    watch: [updateYearCell, updateMonthCell, updateDayCell, panelLinkage],
  },
  week: {
    children: createComponent([Day]),
    watch: [],
    //watch: [updateYearCell, updateMonthCell, updateDayCell, startMonthAndYear],
  },
  month: {
    children: [Header, Month, Year],
    watch: [],
    //watch: [updateMonthCell, updateYearCell],
  },
  'month-range': {
    children: rangeComponent(Month),
    watch: [],
    // watch: [updateMonthCell, yearPanelLinkage],
  },
  year: {
    children: [Header, Year],
    watch: [],
    // watch: [updateYearCell],
  },
  'year-range': {
    children: rangeComponent(Year),
    watch: [],
    // watch: [updateYearCell, yearPanelLinkage],
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
