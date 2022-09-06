import { State } from './store'

export type Sub = (this: State, ...arg: any) => Sub | unknown
