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

  async closeProject(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.closeProject(req.body.projectId, req.body.reason),
      )
    } catch (error) {
      next(error)
    }
  }

  async addProjectCommission(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.addProjectCommission(req.body),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateHiringStatus(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateHiringStatus(
          req.body.projectId,
          req.body.hiringStatus,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateProjectContractStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateProjectContractStatus(
          req.body.projectId,
          req.body.contractStatus,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async getCandidateListByStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await projectService.getCandidateListByStatus(req.query),
      )
    } catch (error) {
      next(error)
    }
  }

  async inviteFreelancer(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.inviteFreelancer(
          req.body.projectId,
          req.body.userId,
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async updateCandidateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await projectService.updateCandidateStatus(req.body),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const projectController = new ProjectController()
