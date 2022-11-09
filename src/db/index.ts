import { connect } from 'mongoose'
import config from '../config'
import logger from '../logger'

const initDb = async () => {
    try {
        await connect(config.DB_URL)
        logger.info('connected with database')
    } catch (err) {
        logger.error(`Can't establish connection with database`)
    }
}

export default initDb
