import { NotFoundException } from '../exceptions'
import { freelancerHelper } from '../helpers'
import { MESSAGES } from '../constants'

class FreelancerService {
  async searchFreelancers(data) {
    try {
      const [[searchCount], searchList] = await Promise.all([
        freelancerHelper.searchFreelancerCount(data),
        freelancerHelper.searchFreelancer(data),
      ])

      if (!searchCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: searchCount[0].total,
          searchList: searchList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const freelancerService = new FreelancerService()
