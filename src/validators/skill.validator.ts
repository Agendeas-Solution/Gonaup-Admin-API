import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const skillSchemas = {
  skillList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
