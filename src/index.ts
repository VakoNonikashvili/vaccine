import express, { Express, Request, Response } from 'express'
import logger from './logger'
import config from './config'

const app: Express = express()

app.get('/', (_, res: Response) => {
    res.send('Server is running')
})

const port = config.PORT || 8000
app.listen(port, () => logger.info(`Server is running at port: ${port}`))