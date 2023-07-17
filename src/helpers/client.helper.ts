import { S3_CONFIG } from '../config'
import { S3 } from '../constants'
import { pool } from '../databases'
import { paginationLimitQuery } from '../utils'

class ClientHelper {
  async getClientList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    const findQuery = `
      SELECT
        u.id,
        concat("${
          S3_CONFIG.S3_URL + S3.PROFILE
        }/", u.image_url) as user_image_url,
        first_name,
        last_name,
        country_name,
        (
          SELECT
            COUNT(1)
          FROM
            projects
          WHERE
            company_id = c.id
            AND contract_status IN (0,1)
        ) as openProjects,
        (
          SELECT
            COUNT(1)
          FROM
            projects
          WHERE
            company_id = c.id
        ) as totalProjects  
      FROM
        user_master as u
      LEFT JOIN
        companies as c
      ON
        u.id = c.user_id
      WHERE
        u.deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
        AND type = ?
        ${whereQuery}
      ORDER BY
        u.created_at DESC
      ${limitQuery}`
    return pool.query(findQuery, [data.type])
  }

  async getClientCount(data) {
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
        deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
        AND type = ?
        ${whereQuery}`
    return pool.query(findQuery, [data.type])
  }
}

export const clientHelper = new ClientHelper()
