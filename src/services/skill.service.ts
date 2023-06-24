import { BadRequestException, NotFoundException } from '../exceptions'
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

  async addSkill(name: string) {
    try {
      const [skill] = await skillHelper.getSkillByName(name)

      if (skill[0])
        throw new BadRequestException(MESSAGES.SKILL.SKILL_ALREADY_EXISTS)

      await skillHelper.addSkill(name)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_SAVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateSkill(name: string, skillId: number) {
    try {
      const [skill] = await skillHelper.checkSkillByNameAndId(name, skillId)

      if (skill[0])
        throw new BadRequestException(MESSAGES.SKILL.SKILL_ALREADY_EXISTS)

      await skillHelper.updateSkill(name, skillId)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteSkill(skillId: number) {
    try {
      await skillHelper.deleteSkill(skillId)
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_REMOVED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const skillService = new SkillService()
