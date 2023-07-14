import { BadRequestException, NotFoundException } from '../exceptions'
import { serviceHelper } from '../helpers'
import { MESSAGES } from '../constants'

class ServiceService {
  async getServiceList(data) {
    try {
      const [[serviceCount], serviceList] = await Promise.all([
        serviceHelper.getServiceCount(data),
        serviceHelper.getServiceList(data),
      ])

      if (!serviceCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: serviceCount[0].total,
          serviceList: serviceList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addService(name: string) {
    try {
      const [service] = await serviceHelper.getServiceByName(name)

      if (service[0])
        throw new BadRequestException(MESSAGES.SERVICE.SERVICE_ALREADY_EXISTS)

      await serviceHelper.addService(name)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateService(name: string, serviceId: number) {
    try {
      const [service] = await serviceHelper.checkServiceByNameAndId(
        name,
        serviceId,
      )

      if (service[0])
        throw new BadRequestException(MESSAGES.SERVICE.SERVICE_ALREADY_EXISTS)

      await serviceHelper.updateService(name, serviceId)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteService(serviceId: number) {
    try {
      await serviceHelper.deleteService(serviceId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const serviceService = new ServiceService()
