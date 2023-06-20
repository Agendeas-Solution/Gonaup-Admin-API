import { Router } from 'express'
import { adminController } from '../controllers'
import { validateTokenMiddleware } from '../middlewares'

const adminRouter = Router()

adminRouter.get('/', validateTokenMiddleware, adminController.getAdminProfile)

export { adminRouter }
