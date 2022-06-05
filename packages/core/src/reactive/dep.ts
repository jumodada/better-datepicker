import { Fn } from '../types/utils'

export const createDep = (): Set<Fn> => {
  return new Set<Fn>()
}
