import { NextFunction, Request, Response } from 'express'
import { projectService } from '../services'
import { sendSuccessResponse } from '../utils'

class ProjectController {
  async getProjectList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await projectService.getProjectList(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getProjectDetailsById(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getProjectDetailsById(Number(req.query.projectId)),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const projectController = new ProjectController()
