import { MESSAGES } from '../constants'
import { NotFoundException } from '../exceptions'
import { notificationHelper } from '../helpers'

class NotificationService {
  async getNotificationList(data) {
    try {
      const [[notificationCount], [notificationRecords]] = await Promise.all([
        notificationHelper.getNotificationCount(data),
        notificationHelper.getNotificationList(data),
      ])

      if (!notificationCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: notificationCount[0].total,
          notificationList: notificationRecords,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getNotificationUnreadCount(userId: number) {
    try {
      const [notificationCount] =
        await notificationHelper.getNotificationUnreadCount(userId)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          unReadCount: notificationCount[0].count,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const notificationService = new NotificationService()
