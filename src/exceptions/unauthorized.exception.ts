import { HttpException } from './http.exception'
import { createHttpExceptionBody } from '../utils'
import { HTTP_STATUSES } from '../constants'

/**
 * Use to give unauthorized error response
 * @export
 * @class UnauthorizedException
 * @extends {HttpException}
 */
export class UnauthorizedException extends HttpException {
  constructor(message?: string | object | any, error = 'Unauthorized') {
    super(
      createHttpExceptionBody(message, error, HTTP_STATUSES.UNAUTHORIZED),
      HTTP_STATUSES.UNAUTHORIZED,
    )
  }
}
