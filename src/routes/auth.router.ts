import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware } from '../middlewares'
import { authSchemas } from '../validators'
import { authController } from '../controllers'

const authRouter = Router()

authRouter.post(
  API_URL.EMAIL_SIGNUP,
  joiValidatorMiddleware(authSchemas.emailSignup),
  authController.emailSignup,
)

authRouter.post(
  API_URL.LOGIN,
  joiValidatorMiddleware(authSchemas.login),
  authController.login,
)

export { authRouter }
