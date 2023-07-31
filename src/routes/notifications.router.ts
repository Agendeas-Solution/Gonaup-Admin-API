import { Router } from 'express'
import { API_URL } from '../constants'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { notificationController } from '../controllers'
import { notificationSchema } from '../validators'

const notificationRouter = Router()

notificationRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(notificationSchema.notificationList),
  validateTokenMiddleware,
  notificationController.getNotificationList,
)

notificationRouter.get(
  API_URL.NOTIFICATION_COUNT,
  validateTokenMiddleware,
  notificationController.getNotificationUnreadCount,
)

export { notificationRouter }
