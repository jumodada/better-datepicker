import nextTick from '../utils/nexttick'

const queue: any[] = []
const map = new WeakMap()
let queued = false

function flushSchedulerQueue() {
  for (const job of queue) {
    job()
    map.delete(job)
  }
  queued = false
  queue.length = 0
}

export function queueWatcher(fn: any): void {
  if (!map.get(fn)) {
    map.set(fn, true)
    queue.push(fn)
    if (!queued) {
      queued = true
      nextTick(flushSchedulerQueue)
    }
  }
}
