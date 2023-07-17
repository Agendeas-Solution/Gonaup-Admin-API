import { Router } from 'express'
import { clientController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { clientSchemas } from '../validators'
import { API_URL } from '../constants'

const clientRouter = Router()

clientRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(clientSchemas.getClientList),
  validateTokenMiddleware,
  clientController.getClientList,
)

export { clientRouter }
