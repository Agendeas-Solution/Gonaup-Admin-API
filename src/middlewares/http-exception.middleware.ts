import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions'
import { sendErrorResponse } from '../utils'

export function HandleHttpException(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(error instanceof HttpException)) {
    next(error)
    return
  }
  const message = error.message.message || error.message
  return sendErrorResponse(res, { message }, error.getStatus())
}
