import { paginationLimitQuery } from '../utils'
import { pool } from '../databases'

class ServiceHelper {
  async getServiceList(data) {
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
      services
    WHERE
      deleted_at IS NULL
      ${whereQuery}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async getServiceCount(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND name like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      services
    WHERE
      deleted_at IS NULL
      ${whereQuery}`
    return pool.query(findQuery)
  }

  async addService(name: string) {
    const insertQuery = `
    INSERT INTO services
        (name)
    VALUES 
        (?)`
    return pool.query(insertQuery, [name])
  }

  async getServiceByName(name: string) {
    const insertQuery = `
    SELECT
      name
    FROM 
      services
    WHERE
      name = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name])
  }

  async checkServiceByNameAndId(name: string, serviceId: number) {
    const insertQuery = `
    SELECT
      name
    FROM 
      services
    WHERE
      name = ?
      AND id != ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, serviceId])
  }

  async updateService(name: string, serviceId: number) {
    const insertQuery = `
    UPDATE
      services
    SET
      name = ?
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(insertQuery, [name, serviceId])
  }

  async deleteService(serviceId: number) {
    const insertQuery = `
    UPDATE
      services
    SET
      deleted_at = now()
    WHERE
      id = ?`
    return pool.query(insertQuery, [serviceId])
  }
}

export const serviceHelper = new ServiceHelper()
