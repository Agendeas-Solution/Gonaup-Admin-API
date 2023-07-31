import { S3_CONFIG } from '../config'
import { S3 } from '../constants'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class NotificationHelper {
  getNotificationList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      n.id,
      n.title,
      n.content,
      n.project_id,
      first_name,
      last_name,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as image_url,
      is_admin_read
    FROM
      notifications as n
    LEFT JOIN
      user_master as u
    ON
      n.sender_id = u.id
    ORDER BY
      n.created_at DESC
    ${limitQuery}`

    return pool.query(findQuery, [data.userId])
  }

  getNotificationCount(data) {
    const findQuery = `
    SELECT
      COUNT(1) as total
    FROM
      notifications`
    return pool.query(findQuery, [data.userId])
  }

  getNotificationUnreadCount(userId: number) {
    const findQuery = `
    SELECT
      COUNT(1) as count
    FROM
      notifications 
    WHERE
      is_admin_read = 0
    `
    return pool.query(findQuery, [userId])
  }
}

export const notificationHelper = new NotificationHelper()
