import { S3_CONFIG } from '../config'
import { S3 } from '../constants'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class FreelancerHelper {
  async searchFreelancer(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      id,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as user_image_url,
      first_name,
      last_name,
      hourly_rate,
      country_name,
      state_name,
      (
        SELECT 
          COUNT(1) 
        FROM 
          hiring_records 
        WHERE
          user_id = u.id
          AND project_id = ${data.projectId}
          AND status = 0  
      ) as invited_count
    FROM
      user_master as u
    WHERE
      signup_completed = 1
      AND deleted_at IS NULL
      ${whereQuery}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async searchFreelancerCount(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      user_master
    WHERE
      signup_completed = 1
        AND deleted_at IS NULL
      ${whereQuery}`
    return pool.query(findQuery)
  }
}

export const freelancerHelper = new FreelancerHelper()
