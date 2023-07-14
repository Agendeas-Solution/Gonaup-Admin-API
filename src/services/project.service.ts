import { FieldPacket, RowDataPacket } from 'mysql2'
import { NotFoundException } from '../exceptions'
import { projectHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { getSkillList } from '../utils'

class ProjectService {
  async getProjectList(data) {
    try {
      const [[projectCount], [projectRecords]] = await Promise.all([
        projectHelper.getProjectsCount(data),
        projectHelper.getProjectList(data),
      ])

      const projectList = projectRecords as [RowDataPacket[][], FieldPacket[]]

      if (!projectCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      for (const project of projectList) {
        if (project['skills']) {
          project['skills'] = await getSkillList(project, 'skills', true)
        }
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: projectCount[0].total,
          data: projectList,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getProjectDetailsById(projectId: number) {
    try {
      const [projectDetail] = await projectHelper.getProjectDetailsById(
        projectId,
      )

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (projectDetail[0].skills) {
        projectDetail[0].skills = await getSkillList(projectDetail[0], 'skills')
      }

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: projectDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const projectService = new ProjectService()
