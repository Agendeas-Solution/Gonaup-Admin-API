import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const projectSchemas = {
  projectOrJobList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      serviceId: Joi.number(),
      skills: Joi.string(),
      minHourlyRate: Joi.number(),
      hiringStatus: Joi.number(),
      contactStatus: Joi.number(),
      jobStatus: Joi.number(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  projectDetailsById: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),
}
