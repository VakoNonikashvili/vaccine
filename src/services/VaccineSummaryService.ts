import VaccinationInfo from '../db/models/vaccinationInfo'
import { convertISOToDate, convertDateToISO, getWeekEnd, getDatesByRange } from '../helpers'

interface ISortOption {
    [key: string]: 1 | -1
}

interface IVaccineSummaryAggregate {
    _id: Date
    numberDosesReceived: number
}


interface IVaccineSummaryRequestQuery {
    dateFrom: string
    dateTo: string
    c: string
    range: number
    sort?: string
}

interface IVaccineSummaryResponseInnerBody {
    weekStart: string
    weekEnd: string
    numberDosesReceived: number
}

export interface IVaccineSummaryResponseBody {
    summary: IVaccineSummaryResponseInnerBody[]
}

export const getVaccineSummary = async (query: IVaccineSummaryRequestQuery): Promise<IVaccineSummaryResponseBody | never> => {
    const dateFrom: Date = convertISOToDate(query.dateFrom)
    const dateTo: Date  = convertISOToDate(query.dateTo)
    const boundaries: Date[] = getDatesByRange(dateFrom, dateTo, query.range)
    const sort: string = query.sort || 'weekStart'
    const sortOption: ISortOption = sort === 'weekStart' ? { _id: 1 } : { numberDosesReceived: -1 }

    const summary: IVaccineSummaryAggregate[] = await VaccinationInfo.aggregate([
        {
            $match: {
                date: {
                    $gte: dateFrom,
                    $lt: dateTo
                },
                country: query.c,
            }
        },
        {
            $bucket: {
                groupBy: "$date",
                boundaries,
                output: {
                    numberDosesReceived: { $sum: "$numberDosesReceived" }
                }
            }
        },
        {
            $sort: sortOption
        }
    ])

    const result: IVaccineSummaryResponseBody = {
        summary: summary.map((item: IVaccineSummaryAggregate) => ({
            weekStart: convertDateToISO(item._id),
            weekEnd: getWeekEnd(item._id, query.range),
            numberDosesReceived: item.numberDosesReceived
        }))
    }

    return result

}