import { Router } from 'express'
import { authRouter } from './auth.router'
import { adminRouter } from './admin.router'
import { projectRouter } from './project.router'
import { skillRouter } from './skill.router'
import { serviceRouter } from './service.router'
import { freelancerRouter } from './freelancer.router'
import { clientRouter } from './client.router'
import { notificationRouter } from './notifications.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/project', projectRouter)
router.use('/skill', skillRouter)
router.use('/service', serviceRouter)
router.use('/freelancer', freelancerRouter)
router.use('/client', clientRouter)
router.use('/notifications', notificationRouter)

export { router }
