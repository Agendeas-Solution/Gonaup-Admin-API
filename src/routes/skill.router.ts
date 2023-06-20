import { Router } from 'express'
import { skillController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { skillSchemas } from '../validators'
import { API_URL } from '../constants'

const skillRouter = Router()

skillRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(skillSchemas.skillList),
  validateTokenMiddleware,
  skillController.getSkillList,
)

export { skillRouter }
