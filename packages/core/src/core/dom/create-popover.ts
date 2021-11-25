import { State } from '../../types/store'
import { createElement } from '../../utils/element'
import { Header } from '../components/header'
import { Day } from '../components/date&week'
import { Month, Year } from '../components/month&year'
import { PopoverType } from '../../types/components'
import { has } from '../../utils/typeOf'
import { canIUseAnimation } from '../../utils/env'
import { classNames } from '../../utils/attribute'

function rangeComponent(child: any) {
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
const popoverType: PopoverType = {
  date: dateAndWeek,
  week: dateAndWeek,
  'date-range': rangeComponent(Day),
  month: [Header, Month, Year],
  'month-range': rangeComponent(Month),
  year: [Header, Year],
  'year-range': rangeComponent(Year),
}

export function deleteRules(sheet: any = document.styleSheets[0]): void {
  const ruleSheet = sheet.rules
  if (ruleSheet && ruleSheet.length > 0) {
    for (let i = 1; i >= 0; i--) {
      if (!ruleSheet[i]) return
      const { name, type } = ruleSheet[i]
      if (has(['show', 'hidden'], name) && type === 7) {
        sheet.deleteRule(i)
      }
    }
  }
}

function listenToAnimation(pop: HTMLElement) {
  pop.style.display = 'none'
  if (canIUseAnimation()) {
    pop.addEventListener('animationend', (e) => {
      pop.style.display = e.animationName === 'hidden' ? 'none' : ''
    })
  }
}

export function createPopover(state: State): void {
  state.popover = createElement(
    {
      //class: state.classes.concat(['wrapper']),
      class: classNames('wrapper'),
      children: popoverType[state.type],
      hidden: true,
      style: {
        display: 'inline-block',
        position: 'absolute',
        zIndex: state.zIndex,
      },
    },
    state
  ) as HTMLElement
  listenToAnimation(state.popover)
}
