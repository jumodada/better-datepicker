export default function map<T>(cb: (idx: number) => T, number: number): T[] {
  return Array.from({ length: number }).map((_, idx) => cb(idx))
}
