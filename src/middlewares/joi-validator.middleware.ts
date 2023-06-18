import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

export function joiValidatorMiddleware(schema: Schema) {
  return _joiValidator.bind({ schema })
}

async function _joiValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const schema: Schema = this.schema
    await schema.validateAsync(req)
    next()
  } catch (error) {
    next(error)
  }
}
