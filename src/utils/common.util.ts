import { FieldPacket, RowDataPacket } from 'mysql2'
import { EMAIL_CONFIG, S3_CONFIG } from '../config'
import { mailHelper, serviceHelper, skillHelper } from '../helpers'
import { sendEmailInterface } from '../interfaces'

export const paginationLimitQuery = (pageNumber = 1, pageSize = 10) => {
  const pageOffset = (pageNumber - 1) * pageSize
  return ` LIMIT ${pageSize} OFFSET ${pageOffset} `
}

export const getMultiImgArray = (imagePath: string, s3Path: string) => {
  const imageArray = imagePath.split(',')
  return imageArray
    .map(img => (img ? S3_CONFIG.S3_URL + s3Path + '/' + img : ''))
    .filter(img => img)
}

export const getSkillList = async (
  record: any,
  key: string,
  isOnlyName = false,
) => {
  const [skillList] = (await skillHelper.getSkillListByIds(record[key])) as [
    RowDataPacket[][],
    FieldPacket[],
  ]

  return isOnlyName ? skillList.map(s => s['name']).toString() : skillList
}

export const getServiceList = async (
  record: any,
  key: string,
  isOnlyName = false,
) => {
  const [serviceList] = (await serviceHelper.getServiceListByIds(
    record[key],
  )) as [RowDataPacket[][], FieldPacket[]]

  return isOnlyName ? serviceList.map(s => s['name']).toString() : serviceList
}

export const getProjectOrJobListSearchQuery = (data: any) => {
  let whereQuery = ''

  if (data.searchQuery) {
    whereQuery += ` AND title like '%${data.searchQuery}%'`
  }
  if (data.serviceId) {
    whereQuery += ` AND service_id = ${data.serviceId}`
  }
  if (data.skills) {
    whereQuery += getSkillOrServiceFilterQuery(data.skills.split(','), 'skills')
  }
  if (data.minHourlyRate) {
    whereQuery += ` AND min_hourly_budget = ${data.minHourlyRate}`
  }
  if (data.hiringStatus) {
    whereQuery += ` AND hiring_status = ${data.hiringStatus}`
  }
  if (data.contactStatus) {
    whereQuery += ` AND contract_status = ${data.contactStatus}`
  }
  if (data.jobStatus) {
    whereQuery += ` AND project_status = ${data.jobStatus}`
  }

  return whereQuery
}

export const getSkillOrServiceFilterQuery = (
  list: any,
  column: string,
  isOr = false,
) => {
  let findInSetQuery = ''

  for (const element of list) {
    findInSetQuery += ` ${
      isOr ? 'OR' : 'AND'
    } FIND_IN_SET(${element},${column}) > 0`
  }
  return findInSetQuery
}

export async function sendEmail({
  to,
  subject = '',
  text = '',
  html = '',
}: sendEmailInterface) {
  try {
    await mailHelper.getTransport().sendMail({
      from: {
        name: EMAIL_CONFIG.SENDER_NAME,
        address: EMAIL_CONFIG.SENDER_EMAIL,
      },
      to,
      subject,
      text,
      html,
    })
  } catch (error) {
    console.log(error)
    return error
  }
}
