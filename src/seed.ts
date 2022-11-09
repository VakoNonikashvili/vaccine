import axios from 'axios'
import logger from './logger'
import initDb from './db'
import VaccinationInfo from './db/models/vaccinationInfo'
import { convertISOToDate } from './helpers'

interface IVaccinationData {
    YearWeekISO: string
    FirstDose: number
    FirstDoseRefused: string
    SecondDose: number
    DoseAdditional1: number
    DoseAdditional2: number
    DoseAdditional3: number
    UnknownDose: number
    NumberDosesReceived: number
    NumberDosesExported: number
    Region: string
    Population: string
    ReportingCountry: string
    TargetGroup: string
    Vaccine: string
    Denominator: number
}

const url = 'https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/json/'

const fetchData = async (): Promise<IVaccinationData[] | never> => {
    const { data } = await axios.get(url)
    return data.records as IVaccinationData[]
}

const seed = async (): Promise<void> => {
    try {
        await initDb()
        await VaccinationInfo.deleteMany()
        const data = await fetchData();
        const input = data.map((item: IVaccinationData) => ({
            date: convertISOToDate(item.YearWeekISO),
            numberDosesReceived: item.NumberDosesReceived || 0,
            country: item.ReportingCountry
        }))
        await VaccinationInfo.insertMany(input)
        logger.info('Seed successfully finished')
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Seed failed, reason: ${err.message}`)
        } else {
            logger.error('Seed failed, unexpected error')
        }
    }
}

seed()