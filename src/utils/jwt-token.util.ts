import { verify, sign, SignOptions } from 'jsonwebtoken'
import { SERVER_CONFIG } from '../config'

export function validateToken(token: string) {
  return verify(token, SERVER_CONFIG.JWT_SECRET)
}

export function generateToken(payload: any) {
  return sign(payload, SERVER_CONFIG.JWT_SECRET, {
    algorithm: SERVER_CONFIG.JWT_AlGORITHM as SignOptions['algorithm'],
  })
}
