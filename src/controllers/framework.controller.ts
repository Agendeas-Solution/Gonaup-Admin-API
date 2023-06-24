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

  async addFramework(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await frameworkService.addFramework(req.body.name),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateFramework(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await frameworkService.updateFramework(
          req.body.name,
          req.body.frameworkId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteFramwork(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await frameworkService.deleteFramwork(req.body.frameworkId),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const frameworkController = new FrameworkController()
