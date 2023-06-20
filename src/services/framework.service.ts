import { NotFoundException } from '../exceptions'
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
}

export const frameworkService = new FrameworkService()
