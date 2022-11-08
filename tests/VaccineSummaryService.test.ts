import { connect, connection, disconnect } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import moment from 'moment'
import { getVaccineSummary } from '../src/services/VaccineSummaryService'
import VaccinationInfo from '../src/db/models/vaccinationInfo'

let mongod: MongoMemoryServer

beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await connect(uri)

    await VaccinationInfo.insertMany(vaccineInfoItems)
})

afterAll(async () => {
    await connection.dropDatabase()
    await disconnect()
    await mongod.stop()
})

describe('Vaccine summary service', () => {
    it('should successfully result result for AT', async () => {
        const query = {
            c: 'AT',
            dateFrom: '2020-W53',
            dateTo: '2021-W10',
            range: 5
        }

        const expectedResult = {
            summary: [
            {
                weekStart: '2020-W53',
                weekEnd: '2021-W05',
                numberDosesReceived: 25
            },
            {
                weekStart: '2021-W05',
                weekEnd: '2021-W10',
                numberDosesReceived: 15
            }
            ]
        }

        const result = await getVaccineSummary(query)
        expect(result).toEqual(expectedResult)
    })

    it('should successfully result result for 2 weeks range', async () => {
        const query = {
            c: 'AT',
            dateFrom: '2020-W53',
            dateTo: '2021-W10',
            range: 2
        }

        const expectedResult = {
            summary: [
            {
                weekStart: '2020-W53',
                weekEnd: '2021-W02',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W02',
                weekEnd: '2021-W04',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W04',
                weekEnd: '2021-W06',
                numberDosesReceived: 5
            },
            {
                weekStart: '2021-W06',
                weekEnd: '2021-W08',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W08',
                weekEnd: '2021-W10',
                numberDosesReceived: 5
            }
            ]
        }

        const result = await getVaccineSummary(query)
        expect(result).toEqual(expectedResult)
    })

    it('should successfully result result for GE', async () => {
        const query = {
            c: 'GE',
            dateFrom: '2020-W53',
            dateTo: '2021-W10',
            range: 5
        }

        const expectedResult = {
            summary: [
            {
                weekStart: '2020-W53',
                weekEnd: '2021-W05',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W05',
                weekEnd: '2021-W10',
                numberDosesReceived: 20
            }
            ]
        }

        const result = await getVaccineSummary(query)
        expect(result).toEqual(expectedResult)
    })
})


const vaccineInfoItems = [{
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2020-W53').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W01').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W02').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W03').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W04').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W06').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W07').toDate()
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: moment('2021-W08').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W03').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W04').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W06').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W07').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W07').toDate()
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: moment('2021-W09').toDate()
}]