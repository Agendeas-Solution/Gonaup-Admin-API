import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const notificationSchema = {
  notificationList: Joi.object({
    query: Joi.object({
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
