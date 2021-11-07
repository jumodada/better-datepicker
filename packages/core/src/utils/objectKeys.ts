export function objectKeys<O>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[]
}
