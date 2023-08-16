export interface loginInterface {
  email: string
  password: string
}

export interface sendEmailInterface {
  to: string
  subject: string
  text?: string
  html: string
}
