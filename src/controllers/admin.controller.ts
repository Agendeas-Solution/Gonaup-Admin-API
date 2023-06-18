import { NextFunction, Request, Response } from 'express'
import { adminService } from '../services'
import { sendSuccessResponse } from '../utils'

class AdminController {
  async getAdminProfile(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await adminService.getAdminProfile(req.token.userId),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const adminController = new AdminController()
