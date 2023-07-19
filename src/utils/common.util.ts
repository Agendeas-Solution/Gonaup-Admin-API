import { FieldPacket, RowDataPacket } from 'mysql2'
import { S3_CONFIG } from '../config'
import { serviceHelper, skillHelper } from '../helpers'

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
    whereQuery += ` AND FIND_IN_SET(${data.skills},skills)`
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
