import { Get, Route, Tags, Post, Body, Path } from 'tsoa'
import { Trip } from '../models'
import {
  getTrips,
  ITripPayload,
  createTrip,
  getTrip,
} from '../repositories/trip.repository'

@Route('trips')
@Tags('Trip')
export default class TripController {
  @Get('/')
  public async getTrips(): Promise<Array<Trip>> {
    return getTrips()
  }

  @Post('/')
  public async createTrip(@Body() body: ITripPayload): Promise<Trip> {
    return createTrip(body)
  }

  @Get('/:id')
  public async getTrip(@Path() id: string): Promise<Trip | null> {
    return getTrip(Number(id))
  }
}
