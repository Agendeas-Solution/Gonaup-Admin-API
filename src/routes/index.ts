import { Router } from 'express'
import { authRouter } from './auth.router'
import { adminRouter } from './admin.router'
import { projectRouter } from './project.router'
import { skillRouter } from './skill.router'
import { serviceRouter } from './service.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/project', projectRouter)
router.use('/skill', skillRouter)
router.use('/service', serviceRouter)

export { router }
