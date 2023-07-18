import { Router } from 'express'
import { freelancerController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { clientSchemas, freelancerSchemas } from '../validators'
import { API_URL } from '../constants'

const freelancerRouter = Router()

freelancerRouter.get(
  API_URL.SEARCH,
  joiValidatorMiddleware(freelancerSchemas.searchFreelancer),
  validateTokenMiddleware,
  freelancerController.searchFreelancers,
)

freelancerRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(freelancerSchemas.freelancerList),
  validateTokenMiddleware,
  freelancerController.getFreelancerList,
)

freelancerRouter.get(
  API_URL.PROFILE,
  joiValidatorMiddleware(clientSchemas.getUserProfile),
  validateTokenMiddleware,
  freelancerController.getFreelancerProfileDetailseById,
)

freelancerRouter.get(
  API_URL.FREELANCER.PROJECT,
  validateTokenMiddleware,
  joiValidatorMiddleware(freelancerSchemas.gerFreelancerProjectDetails),
  freelancerController.getFreelancerProjectDetailById,
)

freelancerRouter.get(
  API_URL.FREELANCER.JOB_LIST,
  validateTokenMiddleware,
  joiValidatorMiddleware(freelancerSchemas.getFreelancerJobList),
  freelancerController.getFreelancerJobList,
)

freelancerRouter.delete(
  API_URL.CLOSE_ACCOUNT,
  joiValidatorMiddleware(freelancerSchemas.closeAccount),
  validateTokenMiddleware,
  freelancerController.closeAccount,
)

export { freelancerRouter }
