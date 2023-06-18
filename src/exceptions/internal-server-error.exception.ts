import { HttpException } from './http.exception'
import { createHttpExceptionBody } from '../utils'
import { HTTP_STATUSES } from '../constants'

/**
 * Use to give internal server error response on user request
 * @export
 * @class InternalServerErrorException
 * @extends {HttpException}
 */
export class InternalServerErrorException extends HttpException {
  constructor(
    message?: string | object | any,
    error = 'Internal Server Error',
  ) {
    super(
      createHttpExceptionBody(
        message,
        error,
        HTTP_STATUSES.INTERNAL_SERVER_ERROR,
      ),
      HTTP_STATUSES.INTERNAL_SERVER_ERROR,
    )
  }
}
