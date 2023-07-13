import { NextFunction, Request, Response } from 'express'
import { searchService } from '../services'
import { sendSuccessResponse } from '../utils'

class SearchController {
  async getSkillList(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccessResponse(
        res,
        await searchService.getSkillList({
          searchQuery: req.query.searchQuery,
          limit: req.query.limit,
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export const searchController = new SearchController()
