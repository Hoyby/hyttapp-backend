import express from 'express'
import TripController from '../controllers/trip.controller'

const router = express.Router()

router.get('/', async (_req, res) => {
  const controller = new TripController()
  const response = await controller.getTrips()
  return res.send(response)
})

router.post('/', async (req, res) => {
  const controller = new TripController()
  const response = await controller.createTrip(req.body)
  return res.send(response)
})

router.get('/:id', async (req, res) => {
  const controller = new TripController()
  const response = await controller.getTrip(req.params.id)
  if (!response) res.status(404).send({ message: 'No trip found' })
  return res.send(response)
})

export default router
