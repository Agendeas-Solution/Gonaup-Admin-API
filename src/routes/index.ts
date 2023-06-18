import { Router } from 'express'
import { authRouter } from './auth.router'
import { adminRouter } from './admin.router'
import { projectRouter } from './project.router'
import { searchRouter } from './search.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/project', projectRouter)
router.use('/search', searchRouter)

export { router }
