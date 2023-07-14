import { paginationLimitQuery } from '../utils'
import { pool } from '../databases'

class SkillHelper {
  async getSkillList(data) {
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
      skills
    WHERE
      deleted_at IS NULL
      ${whereQuery}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async getSkillsCount(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND name like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      skills
    WHERE
      deleted_at IS NULL
      ${whereQuery}`
    return pool.query(findQuery)
  }

  async addSkill(name: string) {
    const insertQuery = `
    INSERT INTO skills
        (name)
    VALUES 
        (?)`
    return pool.query(insertQuery, [name])
  }

  async getSkillByName(name: string) {
    const insertQuery = `
    SELECT
      name
    FROM 
      skills
    WHERE
      name = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name])
  }

  async checkSkillByNameAndId(name: string, skillId: number) {
    const insertQuery = `
    SELECT
      name
    FROM 
      skills
    WHERE
      name = ?
      AND id != ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, skillId])
  }

  async updateSkill(name: string, skillId: number) {
    const insertQuery = `
    UPDATE
      skills
    SET
      name = ?
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, skillId])
  }

  async deleteSkill(skillId: number) {
    const insertQuery = `
    UPDATE
      skills
    SET
      deleted_at = now()
    WHERE
      id = ?`
    return pool.query(insertQuery, [skillId])
  }

  async getSkillListByIds(skillIds: string) {
    const findQuery = `
    SELECT
      id,
      name
    FROM
      skills
    WHERE
      id IN (${skillIds}) 
      AND deleted_at IS NULL`
    return pool.query(findQuery)
  }
}

export const skillHelper = new SkillHelper()
