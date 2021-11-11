import { Callback } from '../types/core'

const callbacks: Callback[] = []
let pending = false

export function flushCallbacks(): void {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (const job of copies) {
    job()
  }
}
const p = Promise.resolve()

export default function nextTick(cb: Callback): void {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    p.then(flushCallbacks)
  }
}
