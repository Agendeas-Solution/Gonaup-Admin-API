import Joi from 'joi'

/**
 * Joi schema for Coupon route request validation
 */
export const serviceSchemas = {
  serviceList: Joi.object({
    query: Joi.object({
      searchQuery: Joi.string(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  addService: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
    }).required(),
  }).unknown(),

  updateService: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      serviceId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteService: Joi.object({
    body: Joi.object({
      serviceId: Joi.number().required(),
    }).required(),
  }).unknown(),
}
