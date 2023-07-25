import { S3_CONFIG } from '../config'
import { S3 } from '../constants'
import { pool } from '../databases'
import { getSkillOrServiceFilterQuery, paginationLimitQuery } from '../utils'

class FreelancerHelper {
  async searchFreelancer(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      id,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as user_image_url,
      first_name,
      last_name,
      hourly_rate,
      country_name,
      state_name,
      (
        SELECT 
          COUNT(1) 
        FROM 
          hiring_records 
        WHERE
          user_id = u.id
          AND project_id = ${data.projectId}
          AND status = 0  
      ) as invited_count
    FROM
      user_master as u
    WHERE
      signup_completed = 1
      AND deleted_at IS NULL
      ${whereQuery}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async searchFreelancerCount(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      user_master
    WHERE
      signup_completed = 1
        AND deleted_at IS NULL
      ${whereQuery}`
    return pool.query(findQuery)
  }

  async getFreelancerList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
    SELECT
      id,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as user_image_url,
      first_name,
      last_name,
      hourly_rate,
      country_name,
      state_name,
      signup_completed,
      (
        SELECT
          COUNT(1)
        FROM
          hiring_records as hr
        LEFT JOIN
          projects as p
        ON
          hr.project_id = p.id
        WHERE
          hr.status = 3
          AND (contract_status IN (0,1) OR project_status = 0)
          AND hr.user_id = u.id
      ) as openJobs,
      (
        SELECT
          COUNT(1)
        FROM
          hiring_records
        WHERE
          user_id = u.id
          AND status = 3
      ) as totalJobs
    FROM
      user_master as u
    WHERE
      deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
      ${this.getFreelancerListSearchQuery(data)}
    ${limitQuery}`
    return pool.query(findQuery)
  }

  async getFreelancerCount(data) {
    const findQuery = `
    SELECT
      COUNT(id) as total
    FROM
      user_master as u
    WHERE
      deleted_at IS ${data.isDeleted === 'true' ? 'NOT' : ''} NULL
      ${this.getFreelancerListSearchQuery(data)}`
    return pool.query(findQuery)
  }

  getFreelancerListSearchQuery(data) {
    let whereQuery = ''

    if (data.searchQuery) {
      whereQuery = `AND CONCAT(first_name, ' ', last_name) like '%${data.searchQuery}%'`
    }

    if (data.serviceIds) {
      whereQuery += getSkillOrServiceFilterQuery(
        data.serviceIds.split(','),
        'services_offer',
      )
    }

    if (data.hourlyRate) {
      whereQuery += ` AND hourly_rate = ${data.hourlyRate}`
    }

    if (data.countryId) {
      whereQuery += ` AND country_id = ${data.countryId}`
    }

    if (data.skills) {
      whereQuery += getSkillOrServiceFilterQuery(
        data.skills.split(','),
        'skills',
      )
    }

    if (data.openForWork) {
      whereQuery += `
      AND (
        SELECT
          COUNT(1)
        FROM
          hiring_records as hr
        LEFT JOIN
          projects as p
        ON
          hr.project_id = p.id
        WHERE
          hr.status = 3
          AND (contract_status IN (0,1) OR project_status = 0)
          AND hr.user_id = u.id
      ) = 0
      `
    }

    return whereQuery
  }

  getFreelancerProfileDetailseById(userId: number) {
    const findQuery = `
    SELECT
      first_name,
      last_name,
      email,
      concat("${S3_CONFIG.S3_URL + S3.PROFILE}/", image_url) as image_url,
      contact_number,
      skype_id,
      address,
      country_name,
      state_name,
      city_name,
      zip_code,
      description,
      professional_role,
      english_level,
      hourly_rate,
      freelance_profile,
      linkdin_profile,
      github_profile,
      services_offer,
      skills
    FROM
      user_master
    WHERE
      id = ?
      AND deleted_at IS NULL
    `
    return pool.query(findQuery, [userId])
  }

  getFreelancerEducationList(userId: number) {
    const findQuery = `
    SELECT
      id,
      school,
      degree,
      study_in,
      date_from,
      date_to
    FROM
      freelancer_education
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerExperienceList(userId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      company,
      is_working,
      working_from,
      working_to,
      city_name,
      country_name
    FROM
      freelancer_experience
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerProjectList(userId: number) {
    const findQuery = `
    SELECT
      id,
      title,
      project_image_url
    FROM
      freelancer_projects
    WHERE
      user_id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [userId])
  }

  getFreelancerProjectDetailById(projectId: number) {
    const findQuery = `
    SELECT
      id,
      project_image_url,
      title,
      project_url,
      description,
      skills,
      date_from,
      date_to
    FROM
      freelancer_projects
    WHERE
      id = ?
      AND deleted_at IS NULL`
    return pool.query(findQuery, [projectId])
  }

  async getFreelancerJobList(data) {
    const limitQuery = paginationLimitQuery(data.page, data.size)

    const findQuery = `
      SELECT
        p.id,
        p.title,
        hr.hired_at,
        hr.final_rate
      FROM
        projects as p
      LEFT JOIN
        hiring_records as hr
      ON
        hr.project_id = p.id
      WHERE
        p.deleted_at IS NULL
        AND hr.user_id = ?
        AND hr.status = 3
      ORDER BY
        p.created_at DESC
      ${limitQuery}`
    return pool.query(findQuery, [data.userId])
  }

  async getFreelancerJobCount(data) {
    const findQuery = `
      SELECT
        COUNT(1) as total
      FROM
        projects as p
      LEFT JOIN
        hiring_records as hr
      ON
        hr.project_id = p.id
      WHERE
        p.deleted_at IS NULL
        AND hr.user_id = ?
        AND hr.status = 3`
    return pool.query(findQuery, [data.userId])
  }
}

export const freelancerHelper = new FreelancerHelper()
