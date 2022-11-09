import express, { Express } from 'express'
import logger from './logger'
import config from './config'
import routes from './routes'
import initDb from './db'
import rateLimiter from './middlewares/rateLimiter'

const app: Express = express()

app.use(rateLimiter)
app.use(routes)

const port = config.PORT || 8000

const init = async () => {
    await initDb()
    app.listen(port, () => logger.info(`Server is running at port: ${port}`))
}

init()

process
  .on('unhandledRejection', (_, p) => {
    logger.error(`Unhandled Rejection at Promise: ${p}`)
  })
  .on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught Exception thrown: ${err.message}`)
    process.exit(1)
  })