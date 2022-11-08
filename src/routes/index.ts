import { Router, Request, Response } from 'express'
import { getVaccineSummary, IVaccineSummaryRequestQuery, IVaccineSummaryResponseBody } from '../services/VaccineSummaryService'

const routes = Router()

type VaccineSummaryRequest = Request<{}, {}, {}, IVaccineSummaryRequestQuery>
type IVaccineSummaryResponse = Response<IVaccineSummaryResponseBody>

routes.get('/vaccine-summary', async (req: VaccineSummaryRequest, res: IVaccineSummaryResponse) => {
    try {
        const result: IVaccineSummaryResponseBody = await getVaccineSummary(req.query)
        
        res.status(200).json(result)
    } catch (err) {
        res.status(500).end()
    }
})

export default routes