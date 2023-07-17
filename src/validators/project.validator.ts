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
      projectType: Joi.number().valid(0, 1).required(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  projectDetailsById: Joi.object({
    query: Joi.object({
      projectId: Joi.number().required(),
    }).required(),
  }).unknown(),

  closeProject: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
      reason: Joi.string().required(),
    }).required(),
  }).unknown(),

  addProjectCommission: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
      budgetType: Joi.number().valid(0, 1).required(),
      commission: Joi.number().greater(0).required(),
    }).required(),
  }).unknown(),

  updateHiringStatus: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
      hiringStatus: Joi.number().valid(0, 1, 2, 3).required(),
    }).required(),
  }).unknown(),

  updateContractStatus: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
      contractStatus: Joi.number().valid(1, 2).required(),
    }).required(),
  }).unknown(),

  candidateListByStatus: Joi.object({
    query: Joi.object({
      hiringStatus: Joi.number().valid(0, 1, 2, 3).required(),
      projectId: Joi.number().required(),
      page: Joi.number(),
      size: Joi.number(),
    }).required(),
  }).unknown(),

  inviteFreelancer: Joi.object({
    body: Joi.object({
      projectId: Joi.number().required(),
      userId: Joi.number().required(),
    }).required(),
  }).unknown(),

  updateCandidateStatus: Joi.object({
    body: Joi.object({
      hRecordId: Joi.number().required(),
      finalRate: Joi.number(),
      status: Joi.number().valid(2, 3).required(),
    }).required(),
  }).unknown(),
}
