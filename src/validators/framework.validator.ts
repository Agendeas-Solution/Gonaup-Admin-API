import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const frameworkSchemas = {
  frameworkList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  addFramework: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
    }).required(),
  }).unknown(),

  updateFramework: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      frameworkId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteFramework: Joi.object({
    body: Joi.object({
      frameworkId: Joi.number().required(),
    }).required(),
  }).unknown(),
}
