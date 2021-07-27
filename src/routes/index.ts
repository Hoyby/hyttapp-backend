import express, { Router } from 'express'
import UserRouter from './user.router'
import EquipmentRouter from './equipment.router'
import TripRouter from './trip.router'
import AuthRouter from './auth.router'

const router = express.Router()

router.use('/users', UserRouter)
router.use('/equipment', EquipmentRouter)
router.use('/trips', TripRouter)
router.use('/auth', AuthRouter)

export default router
