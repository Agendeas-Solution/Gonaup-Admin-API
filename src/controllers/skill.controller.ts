import { NextFunction, Request, Response } from 'express'
import { skillService } from '../services'
import { sendSuccessResponse } from '../utils'

class SkillController {
  async getSkillList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await skillService.getSkillList({
          searchQuery: req.query.searchQuery,
          limit: req.query.limit,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const skillController = new SkillController()
