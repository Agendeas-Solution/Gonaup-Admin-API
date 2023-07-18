import { NotFoundException } from '../exceptions'
import { MESSAGES } from '../constants'
import { clientHelper } from '../helpers'

class ClientService {
  async getClientList(data) {
    try {
      const [[clientCount], [clientRecords]] = await Promise.all([
        clientHelper.getClientCount(data),
        clientHelper.getClientList(data),
      ])

      if (!clientCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: clientCount[0].total,
          data: clientRecords,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getClientUserProfile(userId: number) {
    try {
      const [clientUserProfile] = await clientHelper.getClientUserProfile(
        userId,
      )

      if (!clientUserProfile[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: clientUserProfile[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getClientCompanyProfile(companyId: number) {
    try {
      const [clientCompanyProfile] = await clientHelper.getClientCompanyProfile(
        companyId,
      )

      if (!clientCompanyProfile[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: clientCompanyProfile[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async closeAccount(data) {
    try {
      if (data.type === 0) {
        await clientHelper.closeCompanyAccount(data.companyId)
      } else {
        await clientHelper.closeUserAccount(data.userId)
        await clientHelper.closeCompanyAccount(data.companyId)
      }
      return {
        message: MESSAGES.COMMON_MESSAGE.ACCOUNT_CLOSED,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const clientService = new ClientService()
