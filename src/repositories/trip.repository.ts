import { getRepository } from 'typeorm'
import { Trip } from '../models'

export interface ITripPayload {
    tripName: string
    location: string
    tripStartDate: Date
    tripEndDate: Date
}

export const getTrips = async (): Promise<Array<Trip>> => {
    const tripRepository = getRepository(Trip)
    return tripRepository.find()
}

export const createTrip = async (payload: ITripPayload): Promise<Trip> => {
    const tripRepository = getRepository(Trip)
    const trip = new Trip()
    return tripRepository.save({
        ...trip,
        ...payload,
    })
}

export const getTrip = async (id: number): Promise<Trip | null> => {
    const tripRepository = getRepository(Trip)
    const trip = await tripRepository.findOne({ id: id })
    if (!trip) return null
    return trip
}
