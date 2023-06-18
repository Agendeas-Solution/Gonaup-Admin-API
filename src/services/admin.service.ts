import { NotFoundException } from '../exceptions'
import { adminHelper } from '../helpers'
import { MESSAGES } from '../constants'

class AdminService {
  async getAdminProfile(userId: number) {
    try {
      const [adminProfile] = await adminHelper.getAdminProfile(userId)

      if (!adminProfile[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: adminProfile[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const adminService = new AdminService()
