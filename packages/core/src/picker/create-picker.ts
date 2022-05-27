import { State } from '../types/store'
import { createElement } from '../utils/element'
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
  yearPanelLinkage,
  monthPanelLinkage,
  updateMonthCell,
  updateYearCell,
  updateDayCell,
} from '../watch/cells'
import { startMonthAndYear } from '../watch/utils'
import { concat } from '../utils/concat'

function rangeComponent(child: createMonthOrYearComponentsFunction) {
  const children = [Header, child]
  return [
    {
      class: ['range-wrapper'],
      children: [
        {
          children,
          componentType: 'start',
        },
        {
          children,
          componentType: 'end',
        },
      ],
    },
  ]
}

const dateAndWeek = [Header, Day]

const pickersMap: PickerConfigMap = {
  date: {
    children: concat(dateAndWeek, [Month, Year]),
    watch: [updateYearCell, updateMonthCell, startMonthAndYear, updateDayCell],
  },
  'date-range': {
    children: rangeComponent(Day),
    watch: [updateDayCell],
  },
  week: {
    children: dateAndWeek,
    watch: [updateYearCell, updateMonthCell, updateDayCell, startMonthAndYear],
  },
  month: {
    children: [Header, Month, Year],
    watch: [updateMonthCell, updateYearCell],
  },
  'month-range': {
    children: rangeComponent(Month),
    watch: [updateMonthCell, yearPanelLinkage],
  },
  year: {
    children: [Header, Year],
    watch: [updateYearCell],
  },
  'year-range': {
    children: rangeComponent(Year),
    watch: [updateYearCell, yearPanelLinkage],
  },
}

export function createPicker(state: State): void {
  const { children, watch } = pickersMap[state.type]
  state.popover = createElement(
    {
      //class: state.classes.concat(['wrapper']),
      class: classNames('wrapper'),
      children,
      hidden: true,
      style: {
        display: 'inline-block',
        position: 'absolute',
        zIndex: state.zIndex,
      },
      // TODO range mixins
      watch: watch.concat(mixins),
    },
    state
  ) as HTMLElement
}
