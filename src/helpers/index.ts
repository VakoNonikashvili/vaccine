import moment, { Moment } from 'moment'

export const convertISOToDate = (dateString: string): Date => moment(dateString).toDate()
export const convertDateToISO = (date: Date): string => moment(date).format('GGGG-[W]WW')


export const getWeekEnd = (date: Date, range: number): string => {
    const weekEnd: Date = moment(date).add(range, 'week').toDate()

    return convertDateToISO(weekEnd)
}

export const getDatesByRange = (start: Date, end: Date, range: number): Date[] => {
    const startDate: Moment = moment(start)
    const endDate: Moment = moment(end)
    const result: Date[] = [startDate.toDate()]

    let between = startDate.add(range, 'week')

    while(between.isBefore(endDate)) {
        result.push(between.toDate())
        between = between.add(range, 'week')
    }

    result.push(endDate.toDate())

    return result
}