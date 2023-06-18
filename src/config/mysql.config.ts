/**
 * Configurations for MySql
 */
export const MYSQL_CONFIG = {
  HOST: process.env.MYSQL_HOST,
  PORT: +process.env.MYSQL_PORT,
  DATABASE: process.env.MYSQL_DB_NAME,
  USERNAME: process.env.MYSQL_USERNAME,
  PASSWORD: process.env.MYSQL_PASSWORD,
}
