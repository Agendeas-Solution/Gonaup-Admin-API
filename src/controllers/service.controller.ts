import { NextFunction, Request, Response } from 'express'
import { serviceService } from '../services'
import { sendSuccessResponse } from '../utils'

class ServiceController {
  async getServiceList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await serviceService.getServiceList({
          searchQuery: req.query.searchQuery,
          limit: req.query.limit,
          size: req.query.size,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  async addService(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await serviceService.addService(req.body.name))
    } catch (error) {
      next(error)
    }
  }

  async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await serviceService.updateService(req.body.name, req.body.serviceId),
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await serviceService.deleteService(req.body.serviceId),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const serviceController = new ServiceController()
