import { Router } from 'express'
import { serviceController } from '../controllers'
import { joiValidatorMiddleware, validateTokenMiddleware } from '../middlewares'
import { serviceSchemas } from '../validators'
import { API_URL } from '../constants'

const serviceRouter = Router()

serviceRouter.get(
  API_URL.LIST,
  joiValidatorMiddleware(serviceSchemas.serviceList),
  validateTokenMiddleware,
  serviceController.getServiceList,
)

serviceRouter.post(
  '/',
  joiValidatorMiddleware(serviceSchemas.addService),
  validateTokenMiddleware,
  serviceController.addService,
)

serviceRouter.put(
  '/',
  joiValidatorMiddleware(serviceSchemas.updateService),
  validateTokenMiddleware,
  serviceController.updateService,
)

serviceRouter.delete(
  '/',
  joiValidatorMiddleware(serviceSchemas.deleteService),
  validateTokenMiddleware,
  serviceController.deleteService,
)

export { serviceRouter }
