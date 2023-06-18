import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const searchSchemas = {
  searchList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      limit: Joi.number(),
    }).required(),
  }).unknown(),
}
