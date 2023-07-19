import { NextFunction, Request, Response } from 'express'
import { sendSuccessResponse } from '../utils'
import { authService } from '../services'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await authService.login(req.body))
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await authService.changePassword(
          req.token.userId,
          req.body.newPassword,
          req.body.oldPassword,
        ),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()
