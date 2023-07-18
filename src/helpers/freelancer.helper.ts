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

  async getFreelancerList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      id,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as user_image_url,
      first_name,
      last_name,
      hourly_rate,
      country_name,
      state_name,
      signup_completed,
      (
        SELECT
          COUNT(1)
        FROM
          hiring_records as hr
        LEFT JOIN
          projects as p
        ON
          hr.project_id = p.id
        WHERE
          hr.status = 3
          AND (contract_status IN (0,1) OR project_status = 0)
          AND hr.user_id = u.id
      ) as openJobs,
      (
        SELECT
          COUNT(1)
        FROM
          hiring_records
        WHERE
          user_id = u.id
          AND status = 3
      ) as totalJobs
    FROM
      user_master as u
    WHERE
      deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
      ${this.getFreelancerListSearchQuery(data)}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async getFreelancerCount(data) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      user_master as u
    WHERE
      deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
      ${this.getFreelancerListSearchQuery(data)}`
    return pool.query(findQuery)
  }

  getFreelancerListSearchQuery(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    if (data.serviceIds) {
      whereQuery += ` AND FIND_IN_SET(${data.serviceIds},services_offer)`
    }

    if (data.hourlyRate) {
      whereQuery += ` AND hourly_rate = ${data.hourlyRate}`
    }

    if (data.countryId) {
      whereQuery += ` AND country_id = ${data.countryId}`
    }

    if (data.skills) {
      whereQuery += ` AND FIND_IN_SET(${data.skills},skills)`
    }

    if (data.openForWork) {
      whereQuery += `
      AND (
        SELECT
          COUNT(1)
        FROM
          hiring_records as hr
        LEFT JOIN
          projects as p
        ON
          hr.project_id = p.id
        WHERE
          hr.status = 3
          AND (contract_status IN (0,1) OR project_status = 0)
          AND hr.user_id = u.id
      ) = 0
      `
    }

    return whereQuery
  }
}

export const freelancerHelper = new FreelancerHelper()
