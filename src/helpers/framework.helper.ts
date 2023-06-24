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

  async addFramework(name: string) {
    const insertQuery = `
    INSERT INTO frameworks
        (name)
    VALUES 
        (?)`
    return pool.query(insertQuery, [name])
  }

  async getFrameworkByName(name: string) {
    const insertQuery = `
    SELECT
      name
    FROM 
      frameworks
    WHERE
      name = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name])
  }

  async checkFrameworkByNameAndId(name: string, frameworkId: number) {
    const insertQuery = `
    SELECT
      name
    FROM 
      frameworks
    WHERE
      name = ?
      AND id != ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, frameworkId])
  }

  async updateFramework(name: string, frameworkId: number) {
    const insertQuery = `
    UPDATE
      frameworks
    SET
      name = ?
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, frameworkId])
  }

  async deleteFramwork(frameworkId: number) {
    const insertQuery = `
    UPDATE
      frameworks
    SET
      deleted_at = now()
    WHERE
      id = ?`
    return pool.query(insertQuery, [frameworkId])
  }
}

export const frameworkHelper = new FrameworkHelper()
