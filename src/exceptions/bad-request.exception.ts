import { HttpException } from './http.exception'
import { createHttpExceptionBody } from '../utils'
import { HTTP_STATUSES } from '../constants'

/**
 * Use to give bad request error on user request
 * @export
 * @class BadRequestException
 * @extends {HttpException}
 */
export class BadRequestException extends HttpException {
  constructor(message?: string | object | any, error = 'Bad Request') {
    super(
      createHttpExceptionBody(message, error, HTTP_STATUSES.BAD_REQUEST),
      HTTP_STATUSES.BAD_REQUEST,
    )
  }
}
