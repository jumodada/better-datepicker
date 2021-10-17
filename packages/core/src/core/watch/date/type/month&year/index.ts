import { Sub } from '../../../../../types/observer'
import { updateYear, updateMonth } from './public'
import { Bind } from '../../../../../utils/bind'

export const watchYM = (type = true, name = 'start'): Sub => {
  return Bind(type ? updateMonth : updateYear, name)
}

export const LinkYear = (
  name: 'start' | 'end' = 'start',
  isTen = false
): Sub => {
  const spacing = isTen ? 10 : 1
  return function (): void {
    if (name === 'start') {
      this.end.year = this.start.year + spacing
    } else {
      this.start.year = this.end.year - spacing
    }
  }
}
