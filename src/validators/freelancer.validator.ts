import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const freelancerSchemas = {
  searchFreelancer: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      projectId: Joi.number().required(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),
}
