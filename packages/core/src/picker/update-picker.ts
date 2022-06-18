import { Rect, Transform } from '../types/utils'
import { isInBody } from '../utils/isInBody'
import { State } from '../types/store'
import { objectKeys } from '../utils/objectKeys'

function transform(offset: number | string): Transform {
  offset = offset + 'px'
  return {
    top: `translate(0,calc(-100% - ${offset}))`,
    left: `translate(calc(-100% - ${offset}),0)`,
    bottom: `translate(0,${offset})`,
    right: `translate(${offset},0)`,
  }
}

function getPosition(
  { top, left, height, width }: Rect,
  offset: number
): Transform<{ left: number; top: number }> {
  const _tTop = top + window.scrollY - offset
  const _bTop = top + height + window.scrollY + offset
  const _tLeft = left + window.scrollX
  const _rLeft = left + width + window.scrollX
  return {
    top: { top: _tTop, left: _tLeft },
    left: { top: _tTop, left: _tLeft },
    bottom: { top: _bTop, left: _rLeft - width },
    right: { top: _tTop, left: _rLeft },
  }
}

function resetRangStatus(self: State) {
  const { hoverSelected, start, end } = self
  hoverSelected.status = 'complete'
  if (start.date && start.date) {
    hoverSelected.start = start.date
    hoverSelected.end = end.date
  } else {
    hoverSelected.start = hoverSelected.end = null
  }
}

export function updatePicker(): void {
  const { visible, popover } = this
  if (!popover) return
  if (visible) {
    popover.style.display = ''
    setPopoverLocation.call(this)
  }
  popover.style.display = visible ? '' : 'none'
  resetRangStatus(this)
}

export function setPopoverLocation(): void {
  if (!this.visible) return

  function setTransform(): void {
    popover.style.transform = transform(offset)[placement as 'left']
  }

  function setPosition(): void {
    const position = getPosition(rect, offset)
    Array.from(['left', 'top'] as const).forEach(
      (attr) =>
        (popover.style[attr] = position[placement as 'left'][attr] + 'px')
    )
  }

  function fixReferencePosition() {
    const { parentNode } = reference
    if (parentNode && parentNode.style) parentNode.style.position = 'relative'
  }

  function setCloseToReference() {
    const { offsetWidth, offsetHeight } = reference
    const x = offsetWidth + offset + 'px'
    const transform = {
      bottom: {
        top: offsetHeight + offset + 'px',
        left: 0,
      },
      top: {
        top: `calc(-100% - ${offset}px)`,
        left: 0,
      },
      left: {
        top: 0,
        right: x + offset,
      },
      right: {
        top: 0,
        left: x + offset,
      },
    }
    const tp = transform[placement as 'top']
    objectKeys(tp).forEach((key) => (popover.style[key] = tp[key]))
  }

  const { popover, reference, offset, placement } = this
  const rect = reference.getBoundingClientRect()
  const popInBody = isInBody(popover)
  if (popInBody) {
    setPosition()
    setTransform()
  } else {
    setCloseToReference()
    fixReferencePosition()
  }
}
