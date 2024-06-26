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

  freelancerList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      page: Joi.number(),
      size: Joi.number(),
      serviceIds: Joi.string(),
      hourlyRate: Joi.number(),
      countryId: Joi.number(),
      skills: Joi.string(),
      openForWork: Joi.boolean(),
      isDeleted: Joi.boolean(),
    }).required(),
  }).unknown(),

  gerFreelancerProjectDetails: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  getFreelancerJobList: Joi.object({
    query: Joi.object({
      userId: Joi.number().required(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  closeAccount: Joi.object({
    body: Joi.object({
      userId: Joi.number().required(),
    }).required(),
  }).unknown(),
}
