import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export const convertISOToDate = (dateString: string): Date => {
    const [year, week] = dateString.split('-')
    const days: number = 1 + (Number(week.slice(1)) - 1) * 7

    return new Date(Number(year), 0, days)
}

export const convertDateToISO = (date: Date): string => {
    const year: number = date.getFullYear()
    const week: number = dayjs(date).isoWeek()

    return `${year}-W${week}`
}

export const getWeekEnd = (date: Date, range: number): string => {
    const weekEnd: Date = dayjs(date).add(range, 'week').toDate()

    return convertDateToISO(weekEnd)
}

export const getDatesByRange = (start: Date, end: Date, range: number): Date[] => {
    const startDate: Dayjs = dayjs(start)
    const endDate: Dayjs = dayjs(end)
    const result: Date[] = [startDate.toDate()]

    let between: Dayjs = startDate.add(range, 'week')

    while(between.isBefore(endDate)) {
        result.push(between.toDate())
        between = between.add(range, 'week')
    }

    result.push(endDate.toDate())

    return result
}