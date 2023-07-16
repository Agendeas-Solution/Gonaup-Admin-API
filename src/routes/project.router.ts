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

projectRouter.put(
  API_URL.PROJECT.CLOSE,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.closeProject),
  projectController.closeProject,
)

projectRouter.put(
  API_URL.PROJECT.COMMISSION,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.addProjectCommission),
  projectController.addProjectCommission,
)

projectRouter.put(
  API_URL.PROJECT.HIRING_STATUS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.updateHiringStatus),
  projectController.updateHiringStatus,
)

projectRouter.put(
  API_URL.PROJECT.CONTRACT_STATUS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.updateContractStatus),
  projectController.updateProjectContractStatus,
)

projectRouter.get(
  API_URL.PROJECT.CANDIDATE_LIST,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.candidateListByStatus),
  projectController.getCandidateListByStatus,
)

projectRouter.post(
  API_URL.PROJECT.INVITE,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.inviteFreelancer),
  projectController.inviteFreelancer,
)

projectRouter.put(
  API_URL.PROJECT.CANDIDATE_STATUS,
  validateTokenMiddleware,
  joiValidatorMiddleware(projectSchemas.updateCandidateStatus),
  projectController.updateCandidateStatus,
)

export { projectRouter }
