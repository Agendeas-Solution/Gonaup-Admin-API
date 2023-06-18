import { emailSignupInterface } from '../interfaces'
import { pool } from '../databases'

class AuthHelper {
  async emailSignup(data: emailSignupInterface) {
    const insertQuery = `
    INSERT INTO admin_master
        (name,email,password)
    VALUES 
        (?,?,?)`
    return pool.query(insertQuery, [data.name, data.email, data.password])
  }
}

export const authHelper = new AuthHelper()
