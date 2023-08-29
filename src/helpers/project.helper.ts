import { S3_CONFIG } from '../config'
import { S3 } from '../constants'
import { pool } from '../databases'
import {
  candidateListByStatus,
  saveProjectNotification,
  updateCandidateStatus,
} from '../interfaces'
import { getProjectOrJobListSearchQuery, paginationLimitQuery } from '../utils'

class ProjectHelper {
  async getProjectList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
      SELECT
        id,
        title,
        description,
        budget_type,
        fixed_budget,
        min_hourly_budget,
        max_hourly_budget,
        skills,
        created_at,
        project_status,
        contract_status,
        ${this.getHiringRecordsCountSQLByStatus(0, 'invited')},
        ${this.getHiringRecordsCountSQLByStatus(1, 'interested')},
        ${this.getHiringRecordsCountSQLByStatus(2, 'suggested')},
        ${this.getHiringRecordsCountSQLByStatus(3, 'hired')}
      FROM
        projects as p
      WHERE
        deleted_at IS NULL
        AND project_type = ?
        ${data.companyId ? ` AND company_id = ${data.companyId}` : ''}
        ${getProjectOrJobListSearchQuery(data)}
      ORDER BY
        created_at DESC
      ${limitQuery}`
    return pool.query(findQuery, [data.projectType])
  }

  async getProjectsCount(data) {
    const findQuery = `
      SELECT
        COUNT(id) as total
      FROM
        projects
      WHERE
        deleted_at IS NULL
        AND project_type = ?
        ${data.companyId ? ` AND company_id = ${data.companyId}` : ''}
        ${getProjectOrJobListSearchQuery(data)}`
    return pool.query(findQuery, [data.projectType])
  }

  getHiringRecordsCountSQLByStatus(status: number, alias: string) {
    return `
    (
        SELECT 
            COUNT(1)
        FROM
            hiring_records as hr
        WHERE
            hr.project_id = p.id 
            AND hr.status = ${status}
            AND hr.deleted_at IS NULL
    ) as ${alias}`
  }

  async getProjectDetailsById(projectId: number) {
    const findQuery = `
      SELECT
        p.id,
        p.title,
        p.description,
        p.budget_type,
        p.fixed_budget,
        p.min_hourly_budget,
        p.max_hourly_budget,
        p.skills,
        s.id as service_id,
        s.name as service_name,
        p.project_duration,
        p.experience_needed,
        p.hour_per_week,
        p.project_status,
        p.project_closed_reason,
        p.commission,
        p.hiring_status,
        p.contract_status,
        u.id as clientUserId,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        concat("${
          S3_CONFIG.S3_URL + S3.PROFILE
        }/", u.image_url) as user_image_url,
        u.country_name as user_country,
        u.state_name as user_state,
        u.contact_number as user_contact_number,
        u.email as user_email,
        u.skype_id as user_skype_id,
        c.linkdin_profile as user_linkdin_profile
      FROM
        projects as p
      LEFT JOIN
        services as s 
      ON 
        p.service_id = s.id
      LEFT JOIN
        companies as c
      ON
        p.company_id = c.id
      LEFT JOIN
        user_master as u
      ON
        c.user_id = u.id
      WHERE
        p.id = ?
        AND p.deleted_at IS NULL`
    return pool.query(findQuery, [projectId])
  }

  async closeProject(projectId: number, reason: string) {
    const updateQuery = `
      UPDATE 
        projects
      SET
        project_closed_reason = ?,
        project_status = 1
      WHERE
        id = ?`
    return pool.query(updateQuery, [reason, projectId])
  }

  async addProjectCommission(projectId: number, commission: number) {
    const updateQuery = `
      UPDATE 
        projects
      SET
        commission = ?
      WHERE
        id = ?`
    return pool.query(updateQuery, [commission, projectId])
  }

  async getProjectBudgetAndCommission(projectId: number) {
    const findQuery = `
      SELECT
        fixed_budget,
        min_hourly_budget,
        commission
      FROM
        projects
      WHERE
        id = ?
        AND deleted_at IS NULL`
    return pool.query(findQuery, [projectId])
  }

  async updateHiringStatus(projectId: number, hiringStatus: number) {
    const updateQuery = `
      UPDATE 
        projects
      SET
        hiring_status = ?
      WHERE
        id = ?`
    return pool.query(updateQuery, [hiringStatus, projectId])
  }

  async updateProjectContractStatus(projectId: number, contractStatus: number) {
    const updateQuery = `
      UPDATE 
        projects
      SET
        contract_status = ?
      WHERE
        id = ?`
    return pool.query(updateQuery, [contractStatus, projectId])
  }

  async getCandidateListByStatus(data: candidateListByStatus) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
      SELECT
        hr.id,
        hr.status,
        hr.final_rate,
        hr.suggested_rate,
        u.id as userId,
        concat("${
          S3_CONFIG.S3_URL + S3.PROFILE
        }/", u.image_url) as user_image_url,
        u.first_name,
        u.last_name,
        u.hourly_rate,
        u.country_name,
        u.state_name
      FROM
        hiring_records as hr
      INNER JOIN
        user_master as u
      ON
        u.id = hr.user_id
      WHERE
        hr.project_id = ?
        AND hr.status = ?
        AND hr.deleted_at is NULL
      ORDER BY
        hr.created_at DESC
      ${limitQuery}`
    return pool.query(findQuery, [data.projectId, data.hiringStatus])
  }

  async getCandidateCountByStatus(data: candidateListByStatus) {
    const findQuery = `
      SELECT
        COUNT(1) as total
      FROM
        hiring_records
      WHERE
        project_id = ?
        AND status = ?
        AND deleted_at is NULL`
    return pool.query(findQuery, [data.projectId, data.hiringStatus])
  }

  async inviteFreelancer(projectId: number, userId: number) {
    const insertQuery = `
    INSERT INTO 
      hiring_records
        (project_id, user_id)
    VALUES 
        (?,?)`
    return pool.query(insertQuery, [projectId, userId])
  }

  async getInvitedFreelancerByProjectAndUserId(
    projectId: number,
    userId: number,
  ) {
    const findQuery = `
    SELECT
      id
    FROM
      hiring_records
    WHERE
      project_id = ?
      AND user_id = ?
      AND deleted_at is NULL`
    return pool.query(findQuery, [projectId, userId])
  }

  async updateCandidateStatus(data: updateCandidateStatus) {
    const updateQuery = `
      UPDATE 
        hiring_records
      SET
        status = ?
        ${
          data.status === 3
            ? `,final_rate=${data.finalRate},hired_at=now()`
            : ''
        }
      WHERE
        id = ?`
    return pool.query(updateQuery, [data.status, data.hRecordId])
  }

  async saveNotification(data: saveProjectNotification) {
    const insertQuery = `
    INSERT INTO notifications
      (
        title,
        content,
        project_id
      )
    VALUES 
      (? ,? ,?)`
    return pool.query(insertQuery, [data.title, data.content, data.projectId])
  }

  async saveNotificationRecipients(notificationId: number, userId: number) {
    const insertQuery = `
    INSERT INTO notification_recipients
      (
        notification_id,
        user_id
      )
    VALUES 
      (? ,?)`
    return pool.query(insertQuery, [notificationId, userId])
  }

  async getProjectTitleById(projectId: number) {
    const findQuery = `
      SELECT
        title
      FROM
        projects
      WHERE
        id = ?
        AND deleted_at IS NULL`
    return pool.query(findQuery, [projectId])
  }

  async getUserEmailById(userId: number) {
    const findQuery = `
      SELECT
        email
      FROM
        user_master
      WHERE
        id = ?
        AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }
}

export const projectHelper = new ProjectHelper()
