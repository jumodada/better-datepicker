export const animations = ['hidden 0.3s', 'show 0.3s']

export const sheetRule = [
  (orn: string) =>
    `@keyframes hidden { 0% {opacity: 1;transform: ${orn} scaleY(1);} 100% {opacity: 0;visibility: hidden;transform: ${orn} scaleY(.8);} }`,
  (orn: string) =>
    `@keyframes show { 0% {display: block;opacity: 0;transform:scaleY(.8) ${orn};} 100% {display: block;opacity: 1;transform: scaleY(1) ${orn};} }`,
]

export function deleteRules(sheet: any = document.styleSheets[0]): void {
  const ruleSheet = sheet.rules
  if (ruleSheet && ruleSheet.length > 0) {
    sheetRule.map(() => sheet.deleteRule(0))
  }
}

function animationEndToClosePopover(pop: HTMLElement, visible: boolean) {
  const eventHandler = () => {
    pop.style.display = visible ? '' : 'none'
    pop.removeEventListener('animationend', eventHandler)
    deleteRules()
  }
  pop.addEventListener('animationend', eventHandler)
}

export function usePoppingAnimation(el: HTMLElement, visible: boolean): void {
  animationEndToClosePopover(el, visible)
  const [ss] = Array.from(document.styleSheets)
  const animation = animations[Number(visible)]
  sheetRule.forEach((r) => ss.insertRule(r(el.style.transform), 0))
  el.style.animation = animation
  return
}
