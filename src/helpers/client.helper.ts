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
        u.id as userId,
        c.id as companyId,
        company_name,
        u.type,
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
        c.deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
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
        COUNT(1) as total
      FROM
        user_master as u
      LEFT JOIN
        companies as c
      ON
        u.id = c.user_id
      WHERE
        c.deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
        AND type = ?
        ${whereQuery}`
    return pool.query(findQuery, [data.type])
  }

  async getClientUserProfile(userId: number) {
    const findQuery = `
      SELECT
        concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as image_url,
        first_name, 
        last_name,
        country_name,
        state_name,
        contact_number,
        email,
        skype_id,
        c.linkdin_profile as linkdin_profile
      FROM
        user_master as u
      LEFT JOIN
        companies as c
      ON
        u.id = c.user_id
      WHERE
        u.id = ?`
    return pool.query(findQuery, [userId])
  }

  async getClientCompanyProfile(companyId: number) {
    const findQuery = `
      SELECT
        company_name, 
        position,
        size,
        website,
        c.deleted_at,
        u.country_name,
        u.state_name,
        u.city_name,
        u.zip_code,
        u.address
      FROM
        companies as c
      LEFT JOIN
        user_master as u
      ON
        c.user_id = u.id
      WHERE
        c.id = ?`
    return pool.query(findQuery, [companyId])
  }

  async closeUserAccount(userId: number) {
    const updateQuery = `
      UPDATE 
        user_master
      SET 
        deleted_at = NOW() 
      WHERE
        id = ?;`
    return pool.query(updateQuery, [userId])
  }

  async closeCompanyAccount(companyId: number) {
    const updateQuery = `
      UPDATE
        companies
      SET
        deleted_at = NOW() 
      WHERE
        id = ?;`
    return pool.query(updateQuery, [companyId])
  }
}

export const clientHelper = new ClientHelper()
