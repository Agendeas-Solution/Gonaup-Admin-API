/**
 * Base http exception class.
 * @export
 * @class HttpException
 * @extends {Error}
 */
export class HttpException extends Error {
  /**
   * Response to be sent to user on exception
   * @private
   * @type {(string | object)}
   */
  private readonly response: string | object

  /**
   * Http status of the exception
   * @private
   * @type {number}
   */
  private readonly status: number

  /**
   * Exception message
   * @type {*}
   */
  readonly message: any

  /**
   * Creates an instance of HttpException.
   * This is a base exception class.
   * It generates error response based on given response object
   * @param {(string | object)} response
   * @param {number} status
   */
  constructor(response: string | object, status: number) {
    super()
    this.response = response
    this.status = status
    this.message = response
  }

  /**
   * Give response of exception
   * @returns {(string | object)}
   */
  getResponse(): string | object {
    return this.response
  }

  /**
   * Give http status of exception
   * @returns {number}
   */
  getStatus(): number {
    return this.status
  }

  /**
   * Give exception message in string
   * @returns {string}
   */
  toString(): string {
    const message = this.getErrorString(this.message)
    return `Error: ${message}`
  }

  /**
   * Generate error message string
   * @private
   * @param {*} target
   * @returns
   */
  private getErrorString(target: any) {
    return typeof target === 'string' ? target : JSON.stringify(target)
  }
}
