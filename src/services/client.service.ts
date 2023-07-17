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
}

export const clientService = new ClientService()
