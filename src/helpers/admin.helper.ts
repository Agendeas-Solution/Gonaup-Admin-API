import { pool } from '../databases'

class AdminHelper {
  async getAdminUserByEmail(email: string) {
    const findQuery = `
      SELECT 
        id,
        name, 
        password
      FROM
        admin_master
      WHERE
        email = ?
        AND deleted_at IS NULL
      LIMIT 1`
    return pool.query(findQuery, [email])
  }

  async getAdminProfile(adminId: number) {
    const findQuery = `
    SELECT
      id,
      name,
      email
    FROM
      admin_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    LIMIT 1`
    return pool.query(findQuery, [adminId])
  }
}

export const adminHelper = new AdminHelper()
