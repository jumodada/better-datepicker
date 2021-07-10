import date from './modules/date'
import picker from './modules/picker'
import other from './modules/options'
import {State} from '../types/store'
import ObserveState from '../observer'
import Options from '../types/options'

function State(options: Options): State {
    return Object.assign(picker(), date(), other(options)) as State
}

export default function initState(options: Options): State {
    return ObserveState(State(options))
}
