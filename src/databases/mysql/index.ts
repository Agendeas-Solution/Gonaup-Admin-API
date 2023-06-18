import { createPool, Pool } from 'mysql2/promise'
import { MYSQL_CONFIG } from '../../config'

export const pool: Pool = createPool({
  host: MYSQL_CONFIG.HOST,
  port: MYSQL_CONFIG.PORT,
  user: MYSQL_CONFIG.USERNAME,
  password: MYSQL_CONFIG.PASSWORD,
  database: MYSQL_CONFIG.DATABASE,
})
