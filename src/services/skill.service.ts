import { NotFoundException } from '../exceptions'
import { skillHelper } from '../helpers'
import { MESSAGES } from '../constants'

class SkillService {
  async getSkillList(data) {
    try {
      const [[skillCount], skillList] = await Promise.all([
        skillHelper.getSkillsCount(data),
        skillHelper.getSkillList(data),
      ])

      if (!skillCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: skillCount[0].total,
          skillList: skillList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const skillService = new SkillService()
