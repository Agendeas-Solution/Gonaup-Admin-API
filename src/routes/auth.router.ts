import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { authSchemas } from '../validators'
import { authController } from '../controllers'

const authRouter = Router()

authRouter.post(
  API_URL.AUTH.LOGIN,
  joiValidatorMiddleware(authSchemas.login),
  authController.login,
)

authRouter.put(
  API_URL.AUTH.CHANGE_PASSWORD,
  joiValidatorMiddleware(authSchemas.changePassword),
  validateTokenMiddleware,
  authController.changePassword,
)

export { authRouter }
