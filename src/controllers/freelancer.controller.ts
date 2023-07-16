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
}

export const freelancerController = new FreelancerController()
