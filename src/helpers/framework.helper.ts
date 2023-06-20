import { paginationLimitQuery } from '../utils'
import { pool } from '../databases'

class FrameworkHelper {
  async getFrameworkList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND name like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      id,
      name
    FROM
      frameworks
    WHERE
      deleted_at IS NULL
      ${whereQuery}
   ${limitQuery}`
    return pool.query(findQuery)
  }

  async getFrameworksCount(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND name like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      frameworks
    WHERE
      deleted_at IS NULL
      ${whereQuery}`
    return pool.query(findQuery)
  }
}

export const frameworkHelper = new FrameworkHelper()
