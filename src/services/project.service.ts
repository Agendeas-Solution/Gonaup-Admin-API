import { FieldPacket, RowDataPacket } from 'mysql2'
import { BadRequestException, NotFoundException } from '../exceptions'
import { projectHelper } from '../helpers'
import { MESSAGES } from '../constants'
import { getSkillList } from '../utils'
import { addProjectCommission, updateCandidateStatus } from '../interfaces'

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

  async closeProject(projectId: number, reason: string) {
    try {
      await projectHelper.closeProject(projectId, reason)
      return {
        message: MESSAGES.PROJECT.CLOSED_SUCCEESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addProjectCommission(data: addProjectCommission) {
    try {
      const [projectBudget] = await projectHelper.getProjectBudgetAndCommission(
        data.projectId,
      )
      if (!projectBudget[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      const projectMinBudget =
        data.budgetType === 0
          ? projectBudget[0].fixed_budget
          : projectBudget[0].min_hourly_budget

      if (data.commission >= projectMinBudget)
        throw new BadRequestException(MESSAGES.PROJECT.INVALID_COMMISSION)

      await projectHelper.addProjectCommission(data.projectId, data.commission)
      return {
        message: MESSAGES.PROJECT.COMMISSION,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateHiringStatus(projectId: number, hiringStatus: number) {
    try {
      await projectHelper.updateHiringStatus(projectId, hiringStatus)
      return {
        message: MESSAGES.PROJECT.HIRING_STATUS,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProjectContractStatus(projectId: number, contractStatus: number) {
    try {
      await projectHelper.updateProjectContractStatus(projectId, contractStatus)
      return {
        message: MESSAGES.PROJECT.CONTRACT_STATUS,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getCandidateListByStatus(data) {
    try {
      const [[candidatesCount], [candidateRecords]] = await Promise.all([
        projectHelper.getCandidateCountByStatus(data),
        projectHelper.getCandidateListByStatus(data),
      ])

      if (!candidatesCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: candidatesCount[0].total,
          data: candidateRecords,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async inviteFreelancer(projectId: number, userId: number) {
    try {
      const [projectBudget] = await projectHelper.getProjectBudgetAndCommission(
        projectId,
      )

      if (!projectBudget[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (!projectBudget[0].commission)
        throw new BadRequestException(MESSAGES.PROJECT.COMMISSION_NOT_FOUND)

      const [invitedFreelancer] =
        await projectHelper.getInvitedFreelancerByProjectAndUserId(
          projectId,
          userId,
        )

      if (invitedFreelancer[0])
        throw new BadRequestException(
          MESSAGES.PROJECT.FREELANCER_ALREADY_INVITED,
        )

      await projectHelper.inviteFreelancer(projectId, userId)
      await this.saveNotification(
        projectId,
        userId,
        'You Invited For [[TITLE]]',
        'Please Apply on this project if you are interested.',
      )
      return {
        message: MESSAGES.PROJECT.INVITED_FREELANCER,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateCandidateStatus(data: updateCandidateStatus) {
    try {
      await projectHelper.updateCandidateStatus(data)
      if (data.status === 2) {
        await this.saveNotification(
          data.projectId,
          data.clientUserId,
          'Freelancers Suggested For [[TITLE]]',
          'Check Freelancer by clicking this link.',
        )
      } else if (data.status === 3) {
        await this.saveNotification(
          data.projectId,
          data.userId,
          'You are Hired For [[TITLE]]',
          'Please Join Skype group with this link',
        )
        await this.saveNotification(
          data.projectId,
          data.clientUserId,
          (data.candidateName || 'Freelancer') + 'are Hired For [[TITLE]]',
          'Please Join Skype group with this link',
        )
      }
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_UPDATED_SUCCESSFULLY,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async saveNotification(
    projectId: number,
    userId: number,
    title: string,
    content: string,
  ) {
    const [project] = await projectHelper.getProjectTitleById(projectId)
    const [notification] = await projectHelper.saveNotification({
      projectId,
      title: title.replace('[[TITLE]]', project[0]?.title),
      content,
    })
    await projectHelper.saveNotificationRecipients(
      notification['insertId'],
      userId,
    )
  }
}

export const projectService = new ProjectService()
