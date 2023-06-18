import { NotFoundException } from '../exceptions'
import { searchHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { FieldPacket, RowDataPacket } from 'mysql2'

class SearchService {
  async getSkillList(data) {
    try {
      const skillList = (await searchHelper.getSkillList(
        data.searchQuery,
        data.limit,
      )) as [RowDataPacket[][], FieldPacket[]]

      if (skillList && skillList[0].length <= 0)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: skillList[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFrameworkList(data) {
    try {
      const frameworkList = (await searchHelper.getFrameworkList(
        data.searchQuery,
        data.limit,
      )) as [RowDataPacket[][], FieldPacket[]]

      if (frameworkList && frameworkList[0].length <= 0)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: frameworkList[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const searchService = new SearchService()
