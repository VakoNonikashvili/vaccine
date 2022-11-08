import { Router, Request, Response } from 'express'
import VaccinationInfo from '../db/models/vaccinationInfo'
import { convertISOToDate, convertDateToISO, getWeekEnd, getDatesByRange } from '../helpers'

const routes = Router()

interface IVaccineSummaryRequestQs {
    dateFrom: string
    dateTo: string
    c: string
    range: number
    sort?: 'weekStart' | 'numberDosesReceived'
}

interface IVaccineSummaryAggregate {
    _id: Date
    numberDosesReceived: number
}

interface IVaccineSummaryResponseInnerBody {
    weekStart: string
    weekEnd: string
    numberDosesReceived: number
}

interface IVaccineSummaryResponseBody {
    summary: IVaccineSummaryResponseInnerBody[]
}

interface ISortOption {
    [key: string]: 1 | -1
}

type VaccineSummaryRequest = Request<{}, {}, {}, IVaccineSummaryRequestQs>
type IVaccineSummaryResponse = Response<IVaccineSummaryResponseBody>

routes.get('/vaccine-summary', async (req: VaccineSummaryRequest, res: IVaccineSummaryResponse) => {
    try {
        const dateFrom: Date = convertISOToDate(req.query.dateFrom)
        const dateTo: Date  = convertISOToDate(req.query.dateTo)
        const boundaries: Date[] = getDatesByRange(dateFrom, dateTo, req.query.range)
        const sort: string = req.query.sort || 'weekStart'
        const sortOption: ISortOption = sort === 'weekStart' ? { _id: 1 } : { numberDosesReceived: -1 }

        const summary: IVaccineSummaryAggregate[] = await VaccinationInfo.aggregate([
            {
                $match: {
                    date: {
                        $gte: dateFrom,
                        $lt: dateTo
                    },
                    country: req.query.c,
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
                weekEnd: getWeekEnd(item._id, req.query.range),
                numberDosesReceived: item.numberDosesReceived
            }))
        }

        res.status(200).json(result)
    } catch (err) {
        res.status(500).end()
    }
})

export default routes