import { NextFunction, Request, Response } from 'express'
import { notificationService } from '../services'
import { sendSuccessResponse } from '../utils'

class NotificationController {
  async getNotificationList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await notificationService.getNotificationList({
          ...req.query,
          userId: req.token.userId,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async getNotificationUnreadCount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await notificationService.getNotificationUnreadCount(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const notificationController = new NotificationController()
