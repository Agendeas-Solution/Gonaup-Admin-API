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

  getClientUserProfile: Joi.object({
    query: Joi.object({
      userId: Joi.number().required(),
    }).required(),
  }).unknown(),

  getClientCompanyProfile: Joi.object({
    query: Joi.object({
      companyId: Joi.number().required(),
    }).required(),
  }).unknown(),

  closeAccount: Joi.object({
    body: Joi.object({
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      type: Joi.number().valid(0, 1, 2).required(),
    }).required(),
  }).unknown(),
}
