import { connect, connection, disconnect } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
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
                weekEnd: '2021-W5',
                numberDosesReceived: 25
            },
            {
                weekStart: '2021-W5',
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
                weekEnd: '2021-W2',
                numberDosesReceived: 15
            },
            {
                weekStart: '2021-W2',
                weekEnd: '2021-W4',
                numberDosesReceived: 5
            },
            {
                weekStart: '2021-W4',
                weekEnd: '2021-W6',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W6',
                weekEnd: '2021-W8',
                numberDosesReceived: 10
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
                weekEnd: '2021-W5',
                numberDosesReceived: 10
            },
            {
                weekStart: '2021-W5',
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
    date: new Date(2021, 0, 1)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 6)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 9)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 21)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 33)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 40)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 45)
}, {
    country: 'AT',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 50)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 21)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 33)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 40)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 45)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 50)
}, {
    country: 'GE',
    numberDosesReceived: 5,
    date: new Date(2021, 0, 55)
}]