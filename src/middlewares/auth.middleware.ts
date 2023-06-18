import { validateToken } from '../utils/jwt-token.util'
import { MESSAGES } from '../constants'
import { NotFoundException, UnauthorizedException } from '../exceptions'
import { NextFunction, Request, Response } from 'express'
import { adminHelper } from '../helpers'

export async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException(MESSAGES.COMMON_MESSAGE.NO_TOKEN_SUPPLIED)

    const response: any = validateToken(req.headers.authorization)
    if (!response.userId) {
      throw new UnauthorizedException('Unauthorized!')
    }

    const [adminProfile] = await adminHelper.getAdminProfile(response.userId)

    if (!adminProfile[0])
      throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

    req.token = response
    next()
  } catch (error) {
    console.log(error)
    throw new UnauthorizedException(error && error.message ? error.message : '')
  }
}
