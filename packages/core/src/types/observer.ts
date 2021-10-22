import { State } from './store'

export type Sub<T = unknown> = (this: State, ...arg: any) => T
