import nextTick from '../utils/nexttick'
import Watcher from './watcher'

const queue: Watcher[] = []
const map = new WeakMap()
let queued = false

function flushSchedulerQueue() {
  for (const job of queue) {
    job.getter()
    map.delete(job)
  }
  queued = false
  queue.length = 0
}

export function queueWatcher(watcher: Watcher): void {
  if (!map.get(watcher)) {
    map.set(watcher, true)
    queue.push(watcher)
    if (!queued) {
      queued = true
      nextTick(flushSchedulerQueue)
    }
  }
}
