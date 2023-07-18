import { NotFoundException } from '../exceptions'
import { clientHelper, freelancerHelper } from '../helpers'
import { MESSAGES, S3 } from '../constants'
import { getMultiImgArray, getServiceList, getSkillList } from '../utils'
import { FieldPacket, RowDataPacket } from 'mysql2'

class FreelancerService {
  async searchFreelancers(data) {
    try {
      const [[searchCount], searchList] = await Promise.all([
        freelancerHelper.searchFreelancerCount(data),
        freelancerHelper.searchFreelancer(data),
      ])

      if (!searchCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: searchCount[0].total,
          searchList: searchList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerList(data) {
    try {
      const [[freelancerCount], freelancerList] = await Promise.all([
        freelancerHelper.getFreelancerCount(data),
        freelancerHelper.getFreelancerList(data),
      ])

      if (!freelancerCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: freelancerCount[0].total,
          searchList: freelancerList[0],
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProfileDetailseById(userId: number) {
    try {
      const [userDetails] =
        await freelancerHelper.getFreelancerProfileDetailseById(userId)

      if (!userDetails[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (userDetails[0].services_offer) {
        userDetails[0].services_offer = await getServiceList(
          userDetails[0],
          'services_offer',
        )
      }

      if (userDetails[0].skills) {
        userDetails[0].skills = await getSkillList(userDetails[0], 'skills')
      }

      const [[educationList], [experienceList], [projectList]] =
        await Promise.all([
          freelancerHelper.getFreelancerEducationList(userId),
          freelancerHelper.getFreelancerExperienceList(userId),
          freelancerHelper.getFreelancerProjectList(userId),
        ])

      const iterableProjectList = projectList as [
        RowDataPacket[][],
        FieldPacket[],
      ]

      for (const project of iterableProjectList) {
        if (project['project_image_url']) {
          project['project_image_url'] = getMultiImgArray(
            project['project_image_url'],
            S3.PORTFOLIO_FILE,
          )[0]
        }
      }

      userDetails[0].education = educationList
      userDetails[0].experience = experienceList
      userDetails[0].projects = iterableProjectList

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: userDetails[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerProjectDetailById(projectId: number) {
    try {
      const [projectDetail] =
        await freelancerHelper.getFreelancerProjectDetailById(projectId)

      if (!projectDetail[0])
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      if (projectDetail[0].skills) {
        projectDetail[0].skills = await getSkillList(projectDetail[0], 'skills')
      }

      if (projectDetail[0]['project_image_url']) {
        projectDetail[0]['projectImageArray'] = getMultiImgArray(
          projectDetail[0]['project_image_url'],
          S3.PORTFOLIO_FILE,
        )
      }

      delete projectDetail[0]['project_image_url']
      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: projectDetail[0],
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFreelancerJobList(data) {
    try {
      const [[jobCount], [jobList]] = await Promise.all([
        freelancerHelper.getFreelancerJobCount(data),
        freelancerHelper.getFreelancerJobList(data),
      ])

      if (!jobCount[0].total)
        throw new NotFoundException(MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND)

      return {
        message: MESSAGES.COMMON_MESSAGE.RECORD_FOUND_SUCCESSFULLY,
        data: {
          totalPage: jobCount[0].total,
          data: jobList,
        },
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async closeAccount(userId: number) {
    try {
      await clientHelper.closeUserAccount(userId)
      return {
        message: MESSAGES.COMMON_MESSAGE.ACCOUNT_CLOSED,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const freelancerService = new FreelancerService()
