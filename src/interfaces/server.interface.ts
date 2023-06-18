import { Request } from 'express'

declare module 'express' {
  export interface Request {
    token?: { [key: string]: any }
    user?: { [key: string]: any }
  }
}
