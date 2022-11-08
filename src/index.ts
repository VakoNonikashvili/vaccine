import express, { Express, Request, Response } from 'express'
import logger from './logger'
import config from './config'
import routes from './routes'
import initDb from './db'

const app: Express = express()

app.use(routes)

const port = config.PORT || 8000

const init = async () => {
    await initDb()
    app.listen(port, () => logger.info(`Server is running at port: ${port}`))
}

init()