import { NextFunction, Request, Response } from 'express'
import { clientService } from '../services'
import { sendSuccessResponse } from '../utils'

class ClientController {
  async getClientList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await clientService.getClientList(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getClientUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await clientService.getClientUserProfile(Number(req.query.userId)),
      )
    } catch (error) {
      next(error)
    }
  }

  async getClientCompanyProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      sendSuccessResponse(
        res,
        await clientService.getClientCompanyProfile(
          Number(req.query.companyId),
        ),
      )
    } catch (error) {
      next(error)
    }
  }

  async closeAccount(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(res, await clientService.closeAccount(req.body))
    } catch (error) {
      next(error)
    }
  }
}

export const clientController = new ClientController()
