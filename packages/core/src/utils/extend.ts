export function concat<A>(a: A[], b: any[]): any[] {
  return a.concat(b)
}

export function extend<T, U>(a: T, b: U): T & U {
  return Object.assign(a, b)
}
