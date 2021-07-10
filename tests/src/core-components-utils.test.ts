import {
    handleRange,
    nextMonth,
    nextYear,
    preMonth,
    preYear,
    isDayPage,
    toYearPage,
    selectYM,
    toDayPage,
    toMonthPage
} from "../../src/core/components/utils"
import {createState} from "../../src/store"
import defaultOptions from "../../src/core/util/default-options"
import {MonthOrYearComponents} from '../../src/types/store'

const state = createState(defaultOptions())
const date = '1999/10/1'
state.start._date[0].date = date


describe('handleRange', () => {
    it('`clickHandler` should changed range status and date', () => {
        const clickHandler = handleRange(state.start._date[0])[0].handler.bind(state)
        clickHandler()
        expect(state.range.start).toEqual(date)
        expect(state.range.status).toEqual('selecting')

        clickHandler()
        expect(state.range.end).toEqual(date)
        expect(state.range.status).toEqual('complete')
    })

    it('`mouseenter` should changed range end date if range status is `selecting`', () => {
        const mouseenterHandler = handleRange(state.start._date[0])[1].handler.bind(state)
        state.range.end = '2020/10/1'
        state.range.status = 'complete'
        mouseenterHandler()
        expect(state.range.end).toEqual('2020/10/1')

        state.range.status = 'selecting'
        mouseenterHandler()
        expect(state.range.end).toEqual(date)
    })
})

describe('should increase year', () => {
    it('if `page`=== `year` && `type`=== `start`, `start year` should add 10', () => {
        state.start.year = 2019
        const fn = nextYear.bind(state)
        state.page = 'year'
        fn('start')
        expect(state.start.year).toEqual(2029)
    })
    it('if `page`=== `month` && `type`=== `start`,`start year` should add 1', () => {
        state.start.year = 2019
        const fn = nextYear.bind(state)
        state.page = 'month'
        fn('start')
        expect(state.start.year).toEqual(2020)
    })
    it('if `page`=== `month` && `type`=== `start`,`end year` should add 1', () => {
        state.end.year = 2019
        const fn = nextYear.bind(state)
        state.page = 'month'
        fn('end')
        expect(state.end.year).toEqual(2020)
    })
    it('if `page`=== `month` && `type`=== `start`,`end year` should add 1', () => {
        state.end.year = 2019
        const fn = nextYear.bind(state)
        state.page = 'month'
        fn('end')
        expect(state.end.year).toEqual(2020)
    })
})


describe('should decrease year', () => {
    it('if `page`=== `year`, `start year` should add 10', () => {
        state.start.year = 2019
        const fn = preYear.bind(state)
        state.page = 'year'
        fn()
        expect(state.start.year).toEqual(2009)
    })
    it('if `page`=== `month`,`start year` should add 1', () => {
        state.start.year = 2019
        const fn = preYear.bind(state)
        state.page = 'month'
        fn()
        expect(state.start.year).toEqual(2018)
    })
})

describe('preMonth', () => {
    it('should decrease month', () => {
        state.start.month = 1
        const fn = preMonth.bind(state)
        fn()
        expect(state.start.month).toEqual(12)
    })
})


describe('nextMonth', () => {
    it('should increase start month if `type` === `start`', () => {
        state.start.month = 1
        const fn = nextMonth.bind(state)
        fn('start')
        expect(state.start.month).toEqual(2)
    })
    it('should increase end month if `type` === `end`', () => {
        state.end.month = 1
        const fn = nextMonth.bind(state)
        fn('end')
        expect(state.end.month).toEqual(2)
    })
})

describe('toMonthPage', () => {
    const mockEventTarget: MonthOrYearComponents = {
        status: 'inRange',
        date: '2099/10/3'
    }
    it('should set state page to `month`', () => {
        state.page = 'year'
        toMonthPage.call(state, mockEventTarget)
        expect(state.page).toEqual('month')
    })
})

describe('toYearPage', () => {
    it('should set state page to `year`', () => {
        state.page = 'month'
        toYearPage.call(state)
        expect(state.page).toEqual('year')
    })
})

describe('toDayPage', () => {
    const mockEventTarget: MonthOrYearComponents = {
        status: 'inRange',
        date: '2099/10/3'
    }
    it('should set state page to `day`', () => {
        state.page = 'month'
        state.start.month = 12
        toDayPage.call(state, mockEventTarget)
        expect(state.page).toEqual('date')
        expect(state.start.month).toEqual(10)
    })
})

describe('selectYear', () => {
    const mockEventTarget: MonthOrYearComponents = {
        status: 'inRange',
        date: '2099/10/3'
    }
    it('should  set `year` and `page`', () => {
        state.page = 'year'
        state.start.year = 2020
        selectYM.call(state, mockEventTarget, 'year')
        expect(state.page).toEqual('year')
        expect(state.start.year).toEqual(2099)
    })
})


describe('selectMonth', () => {
    const mockEventTarget = {
        status: 'complete',
        date: '2099/10/3'
    } as any
    it('should  set `month` and `page`', () => {
        state.page = 'year'
        state.start.month = 12
        state.start.date = '1789/10/10'
        state.start._month[1].date = date
        selectYM.call(state, mockEventTarget, 'month')
        expect(state.visible).toBeFalsy()
        expect(state.start.month).toEqual(10)
    })
})


describe('toggleVisibility', () => {
    it('should  return  whether page is `day`', () => {
        expect(isDayPage('date')).toBe('inline-block')
        expect(isDayPage('month')).toBe('none')
        expect(isDayPage('year')).toBe('none')
    })
})
