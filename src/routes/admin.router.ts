import { Router } from 'express'
import { adminController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { adminSchemas } from '../validators'
import { API_URL } from '../constants'

const adminRouter = Router()

adminRouter.get('/', validateTokenMiddleware, adminController.getAdminProfile)

export { adminRouter }
