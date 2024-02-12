import { Router } from 'express'
import * as auth from '../middleware/auth.js'
import { create } from '../controllers/diary.js'
import upload from '../middlewares/upload'

const router = Router()
router.post('/', auth.jwt, upload, create)

export default router
