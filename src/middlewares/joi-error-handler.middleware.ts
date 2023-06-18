import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { sendErrorResponse } from '../utils'
import { HTTP_STATUSES } from '../constants'

export function JoiErrorHandler(
  error: Joi.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(error instanceof Joi.ValidationError)) {
    next(error)
    return
  }
  const errorBody = {
    message: error.message,
    data: error.stack,
  }
  return sendErrorResponse(res, errorBody, HTTP_STATUSES.UNPROCESSABLE_ENTITY)
}
