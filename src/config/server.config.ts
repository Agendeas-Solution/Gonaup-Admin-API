/**
 * Provide server configurations
 */
export const SERVER_CONFIG = {
  PORT: Number(process.env.SERVER_PORT || 8008),
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_AlGORITHM: process.env.JWT_AlGORITHM,
  HASH_SALT: +process.env.HASH_SALT,
}
