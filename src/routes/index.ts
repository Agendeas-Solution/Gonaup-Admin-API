import { Router } from 'express'
import { authRouter } from './auth.router'
import { adminRouter } from './admin.router'
import { projectRouter } from './project.router'
import { searchRouter } from './search.router'
import { frameworkRouter } from './framework.router'
import { skillRouter } from './skill.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/project', projectRouter)
router.use('/search', searchRouter)
router.use('/framework', frameworkRouter)
router.use('/skill', skillRouter)

export { router }
