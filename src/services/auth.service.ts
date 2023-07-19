import { loginInterface } from '../interfaces'
import { MESSAGES } from '../constants'
import bcrypt from 'bcryptjs'
import { SERVER_CONFIG } from '../config'
import { adminHelper } from '../helpers'
import { BadRequestException, NotFoundException } from '../exceptions'
import { generateToken } from '../utils/jwt-token.util'

class AuthService {
  async login(data: loginInterface) {
    try {
      const [existedUser] = await adminHelper.getAdminUserByEmail(data.email)

      if (!existedUser[0])
        throw new NotFoundException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      const isMatched = await bcrypt.compare(
        data.password,
        existedUser[0].password,
      )

      if (!isMatched)
        throw new BadRequestException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      const token = generateToken({ userId: existedUser[0].id })

      return {
        message: MESSAGES.AUTH.USER_LOGIN_SUCCESSFULLY,
        data: { token },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async changePassword(
    userId: number,
    newPassword: string,
    oldPassword: string,
  ) {
    try {
      const [existedUser] = await adminHelper.getOldPassword(userId)

      const isMatched = await bcrypt.compare(
        oldPassword,
        existedUser[0].password,
      )

      if (!isMatched)
        throw new BadRequestException(MESSAGES.AUTH.INVALID_EMAIL_PASSWORD)

      newPassword = await bcrypt.hash(newPassword, SERVER_CONFIG.HASH_SALT)
      await adminHelper.changePassword(userId, newPassword)
      return {
        message: MESSAGES.AUTH.PASSWORD_CHANGED,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const authService = new AuthService()
