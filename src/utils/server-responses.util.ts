import { Response } from 'express'

export function sendSuccessResponse(
  res: Response,
  body: { data?: any; message: string },
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    ...body,
  })
}

export function sendErrorResponse(
  res: Response,
  body: { data?: any; message: string },
  statusCode = 400,
) {
  return res.status(statusCode).json({
    success: false,
    ...body,
  })
}
