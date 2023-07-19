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

  async getOldPassword(adminId: number) {
    const findQuery = `
    SELECT
      password
    FROM
      admin_master
    WHERE
      id = ?`
    return pool.query(findQuery, [adminId])
  }

  async changePassword(adminId: number, newPassword: string) {
    const updateQuery = `
    UPDATE
      admin_master
    SET
      password = ?
    WHERE
      id = ?`
    return pool.query(updateQuery, [newPassword, adminId])
  }
}

export const adminHelper = new AdminHelper()
