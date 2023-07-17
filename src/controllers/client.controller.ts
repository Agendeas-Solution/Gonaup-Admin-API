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
}

export const clientController = new ClientController()
