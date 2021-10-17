import { getNext, getPre } from '../../../../../utils/date'
import { Sub } from '../../../../../types/observer'
import { ReverseMap } from '../../../../../types/watch'

export function linkMonth(name: 'start' | 'end' = 'start'): Sub {
  const reverse: ReverseMap = {
    start: 'end',
    end: 'start',
  }
  return function (): void {
    const data = this[reverse[name]]
    const method = name === 'start' ? getNext : getPre
    ;[data.month, data.year] = method(this[name].month, this[name].year)
  }
}
