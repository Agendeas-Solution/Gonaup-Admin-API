import { BadRequestException, NotFoundException } from '../exceptions'
import { frameworkHelper } from '../helpers'
import { MESSAGES } from '../constants'

class FrameworkService {
  async getFrameworkList(data) {
    try {
      const [[frameworkCount], frameworkList] = await Promise.all([
        frameworkHelper.getFrameworksCount(data),
        frameworkHelper.getFrameworkList(data),
      ])

      if (!frameworkCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: frameworkCount[0].total,
          frameworkList: frameworkList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addFramework(name: string) {
    try {
      const [framework] = await frameworkHelper.getFrameworkByName(name)

      if (framework[0])
        throw new BadRequestException(
          MESSAGES.FRAMEWORK.FRAMEWORK_ALREADY_EXISTS,
        )

      await frameworkHelper.addFramework(name)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateFramework(name: string, frameworkId: number) {
    try {
      const [framework] = await frameworkHelper.checkFrameworkByNameAndId(
        name,
        frameworkId,
      )

      if (framework[0])
        throw new BadRequestException(
          MESSAGES.FRAMEWORK.FRAMEWORK_ALREADY_EXISTS,
        )

      await frameworkHelper.updateFramework(name, frameworkId)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFramwork(frameworkId: number) {
    try {
      await frameworkHelper.deleteFramwork(frameworkId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const frameworkService = new FrameworkService()
