import 'dotenv/config'

import express, { Express, Request, Response, NextFunction } from 'express'
import { SERVER_CONFIG } from './config'
import cors from 'cors'
import { router } from './routes'
import { sendErrorResponse } from './utils'
import { HandleHttpException, JoiErrorHandler } from './middlewares'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.use(JoiErrorHandler)

app.use(HandleHttpException)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('ERROR: ', err)
  let errorBody: { data?: any; message: string } = {
    message: 'Internal Server Error',
  }

  if (SERVER_CONFIG.NODE_ENV === 'development') {
    errorBody = {
      message: err.message,
    }
  }

  return sendErrorResponse(res, errorBody)
})

app.listen(SERVER_CONFIG.PORT, () =>
  console.log(`listening on port ${SERVER_CONFIG.PORT}`),
)
