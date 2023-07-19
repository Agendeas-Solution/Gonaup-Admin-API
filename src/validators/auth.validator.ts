import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const authSchemas = {
  login: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }).unknown(),

  changePassword: Joi.object({
    body: Joi.object({
      newPassword: Joi.string().required(),
      oldPassword: Joi.string().required(),
    }).required(),
  }).unknown(),
}
