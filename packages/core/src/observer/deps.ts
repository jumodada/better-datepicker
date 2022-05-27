export const createDep = (effects?: any): any => {
  return new Set(effects) as any
}
