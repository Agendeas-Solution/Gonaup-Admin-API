import { Router } from 'express'
import { frameworkController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { frameworkSchemas } from '../validators'
import { API_URL } from '../constants'

const frameworkRouter = Router()

frameworkRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(frameworkSchemas.frameworkList),
  validateTokenMiddleware,
  frameworkController.getFrameworkList,
)

export { frameworkRouter }
