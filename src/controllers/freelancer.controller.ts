import { NextFunction, Request, Response } from 'express'
import { freelancerService } from '../services'
import { sendSuccessResponse } from '../utils'

class FreelancerController {
  async searchFreelancers(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.searchFreelancers(req.query),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.getFreelancerList(req.query),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerProfileDetailseById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.getFreelancerProfileDetailseById(
          Number(req.query.userId),
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerProjectDetailById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.getFreelancerProjectDetailById(
          Number(req.query.projectId),
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async getFreelancerJobList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.getFreelancerJobList(req.query),
      )
    } catch (error) {
      next(error)
    }
  }

  async closeAccount(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await freelancerService.closeAccount(req.body.userId),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const freelancerController = new FreelancerController()
