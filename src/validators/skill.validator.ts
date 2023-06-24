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

  addSkill: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
    }).required(),
  }).unknown(),

  updateSkill: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      skillId: Joi.number().required(),
    }).required(),
  }).unknown(),

  deleteSkill: Joi.object({
    body: Joi.object({
      skillId: Joi.number().required(),
    }).required(),
  }).unknown(),
}
