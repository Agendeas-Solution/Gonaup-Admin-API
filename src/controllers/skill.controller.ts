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
          size: req.query.size,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async addSkill(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await skillService.addSkill(req.body.name))
    } catch (error) {
      next(error)
    }
  }

  async updateSkill(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await skillService.updateSkill(req.body.name, req.body.skillId),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteSkill(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await skillService.deleteSkill(req.body.skillId))
    } catch (error) {
      next(error)
    }
  }
}

export const skillController = new SkillController()
