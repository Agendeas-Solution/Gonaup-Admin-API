import { Router } from 'express'
import { projectController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { projectSchemas } from '../validators'
import { API_URL } from '../constants'

const projectRouter = Router()

projectRouter.get(
  API_URL.LIST,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.projectOrJobList),
  projectController.getProjectList,
)

projectRouter.get(
  API_URL.DETAILS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.projectDetailsById),
  projectController.getProjectDetailsById,
)

export { projectRouter }
