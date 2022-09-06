import { Fn } from '../_types/utils'

export const createDep = (): Set<Fn> => {
  return new Set<Fn>()
}
