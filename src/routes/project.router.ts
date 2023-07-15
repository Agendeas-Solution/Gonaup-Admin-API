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

projectRouter.post(
  API_URL.PROJECT.CLOSE,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.closeProject),
  projectController.closeProject,
)

projectRouter.post(
  API_URL.PROJECT.COMMISSION,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.addProjectCommission),
  projectController.addProjectCommission,
)

projectRouter.post(
  API_URL.PROJECT.HIRING_STATUS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.updateHiringStatus),
  projectController.updateHiringStatus,
)

projectRouter.post(
  API_URL.PROJECT.CONTRACT_STATUS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.updateContractStatus),
  projectController.updateProjectContractStatus,
)

export { projectRouter }
