import { State } from './store'

export type DeepChildrenKey<T> = {
  [P in keyof T]: DeepChildrenKey<T[keyof T]>
}

export type DeepChildrenValue<T> = T | T[keyof T]

export interface Dep {
  depend: () => void
  addSub: (sub: any) => void
  updateView: () => void
}

export interface ChildKey {
  name: string
  idx?: number
}

export type Sub<T = void> = (this: State, ...arg: any) => T
