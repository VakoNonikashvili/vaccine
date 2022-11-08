import { Schema, model } from 'mongoose'

interface IVaccinationInfo {
    date: Date | string
    numberDosesReceived: number
    country: string
}

const vaccinationInfoSchema = new Schema<IVaccinationInfo>({
    date: {
        type: Date,
        required: true
    },
    numberDosesReceived: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

const VaccinationInfo = model<IVaccinationInfo>('VaccinationInfo', vaccinationInfoSchema)

export default VaccinationInfo
