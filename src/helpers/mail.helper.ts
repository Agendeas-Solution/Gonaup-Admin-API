import { EMAIL_CONFIG } from '../config'
import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class MailHelper {
  transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_CONFIG.HOST,
      port: parseInt(EMAIL_CONFIG.PORT),
      auth: {
        user: EMAIL_CONFIG.USERNAME,
        pass: EMAIL_CONFIG.PASSWORD,
      },
    })
  }

  getTransport() {
    return this.transporter
  }
}

export const mailHelper = new MailHelper()
