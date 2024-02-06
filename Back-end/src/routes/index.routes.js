import { Router } from 'express'
import { index, translateGPT } from '../controllers/index.controllers.js'

const router = Router()

router.get('/', index)
router.post('/translate', translateGPT)

export default router
