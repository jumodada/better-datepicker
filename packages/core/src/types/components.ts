import { CellsData, RangeType, State } from './store'
import {
  CreateElement,
  CreateElementOptions,
  CreateElementRequiredOptions,
  eventHandler,
  Fn,
  PartialAtLeastOne,
} from './utils'
import { _EventListener } from './utils'
import { PickersMap, DateType, MonthType, YearType } from './store'

export interface createMonthOrYearComponentsFunction {
  (state: State, t: keyof RangeType): PartialAtLeastOne<CreateElementOptions>
}

export type PickerConfigMap = PickersMap<{
  children: (CreateElementRequiredOptions | CreateElement)[]
  watch: (Fn | Fn[])[]
}>

type EventMethod = (this: State) => void

export type DayEvent = DateType<EventMethod, _EventListener[]>

export type MonthEvent = MonthType<EventMethod, _EventListener[]>

export type YearEvent = YearType<EventMethod, _EventListener[]>

export interface RangeClickEvent {
  complete: {
    plt: keyof RangeType
    status: 'selecting'
  }
  selecting: {
    plt: keyof RangeType
    status: 'complete'
  }
}

interface CreateComponentsOptions {
  listener: (child: CellsData, state: State) => eventHandler
  children: (
    idx: number
  ) => (PartialAtLeastOne<CreateElementOptions> | CreateElement)[]
}

export interface ComponentsType<C = never> {
  month: C
  year: C
}

export type CreateMonthOrYearComponentsOptions =
  ComponentsType<CreateComponentsOptions>
