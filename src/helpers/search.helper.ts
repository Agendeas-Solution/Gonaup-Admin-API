import { pool } from '../databases'

class SearchHelper {
  async getSkillList(searchQuery: string, limit = 10) {
    let whereQuery = ''

    if (searchQuery) {
      whereQuery = `AND name like '%${searchQuery}%'`
    }

    const findQuery = `
    SELECT
      id,
      name
    FROM
      skills
    WHERE
      deleted_at IS NULL
      ${whereQuery}
    LIMIT ${limit}`
    return pool.query(findQuery)
  }
}

export const searchHelper = new SearchHelper()
