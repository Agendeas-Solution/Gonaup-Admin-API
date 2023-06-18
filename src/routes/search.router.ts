import { Router } from 'express'
import { searchController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { searchSchemas } from '../validators'
import { API_URL } from '../constants'

const searchRouter = Router()

searchRouter.get(
  API_URL.SKILL + API_URL.LIST,
  joiValidatorMiddleware(searchSchemas.searchList),
  validateTokenMiddleware,
  searchController.getSkillList,
)

searchRouter.get(
  API_URL.FRAMEWORK + API_URL.LIST,
  joiValidatorMiddleware(searchSchemas.searchList),
  validateTokenMiddleware,
  searchController.getFrameworkList,
)

export { searchRouter }
