import { Router, Request, Response } from 'express'
import { getVaccineSummary, IVaccineSummaryResponseBody } from '../services/VaccineSummaryService'

const routes = Router()

type IVaccineSummaryResponse = Response<IVaccineSummaryResponseBody>

routes.get('/vaccine-summary', async (req: Request, res: IVaccineSummaryResponse) => {
    try {
        const dateFrom: string = req.query.dateFrom as string
        const dateTo: string = req.query.dateTo as string
        const c: string = req.query.c as string
        const range: string = req.query.range as string
        const sort: string = req.query.sort as string

        const query = {
            dateFrom,
            dateTo,
            c,
            range: Number(range),
            sort
        }

        const result: IVaccineSummaryResponseBody = await getVaccineSummary(query)
        
        res.status(200).json(result)
    } catch (err) {
        res.status(500).end()
    }
})

export default routes