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

clientRouter.get(
  API_URL.PROFILE,
  joiValidatorMiddleware(clientSchemas.getUserProfile),
  validateTokenMiddleware,
  clientController.getClientUserProfile,
)

clientRouter.get(
  API_URL.CLIENT.COMPANY_PROFILE,
  joiValidatorMiddleware(clientSchemas.getClientCompanyProfile),
  validateTokenMiddleware,
  clientController.getClientCompanyProfile,
)

clientRouter.delete(
  API_URL.CLOSE_ACCOUNT,
  joiValidatorMiddleware(clientSchemas.closeAccount),
  validateTokenMiddleware,
  clientController.closeAccount,
)

export { clientRouter }
