import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const clientSchemas = {
  getClientList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      type: Joi.number().valid(1, 2).required(),
      isDeleted: Joi.boolean(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
