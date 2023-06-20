import { NextFunction, Request, Response } from 'express'
import { frameworkService } from '../services'
import { sendSuccessResponse } from '../utils'

class FrameworkController {
  async getFrameworkList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await frameworkService.getFrameworkList(req.query),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const frameworkController = new FrameworkController()
