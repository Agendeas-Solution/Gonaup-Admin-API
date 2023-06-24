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

frameworkRouter.post(
  '/',
  joiValidatorMiddleware(frameworkSchemas.addFramework),
  validateTokenMiddleware,
  frameworkController.addFramework,
)

frameworkRouter.put(
  '/',
  joiValidatorMiddleware(frameworkSchemas.updateFramework),
  validateTokenMiddleware,
  frameworkController.updateFramework,
)

frameworkRouter.delete(
  '/',
  joiValidatorMiddleware(frameworkSchemas.deleteFramework),
  validateTokenMiddleware,
  frameworkController.deleteFramwork,
)

export { frameworkRouter }
