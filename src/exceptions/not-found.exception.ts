import { HttpException } from './http.exception'
import { createHttpExceptionBody } from '../utils'
import { HTTP_STATUSES } from '../constants'

/**
 * Use to give bad request error on user request
 * @export
 * @class NotFoundException
 * @extends {HttpException}
 */
export class NotFoundException extends HttpException {
  constructor(message?: string | object | any, error = 'Not Found') {
    super(
      createHttpExceptionBody(message, error, HTTP_STATUSES.NOT_FOUND),
      HTTP_STATUSES.NOT_FOUND,
    )
  }
}
