import { Router } from 'express'
import { freelancerController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { freelancerSchemas } from '../validators'
import { API_URL } from '../constants'

const freelancerRouter = Router()

freelancerRouter.get(
  API_URL.SEARCH,
  joiValidatorMiddleware(freelancerSchemas.searchFreelancer),
  validateTokenMiddleware,
  freelancerController.searchFreelancers,
)

export { freelancerRouter }
