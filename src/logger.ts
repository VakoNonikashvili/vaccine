import pino from 'pino'
import config from './config'

const logger = pino({
    enabled: config.NODE_ENV !== 'production'
})

export default logger