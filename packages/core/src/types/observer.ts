import { State } from './store'

export type Sub<T = void> = (this: State, ...arg: any) => T
