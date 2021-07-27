import { getRepository } from 'typeorm'
import { User } from '../models'

export interface IAuthPayload {
  email: string
  password: string
}

export const getUser = async (email: string): Promise<User | null> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ email: email })
  if (!user) throw new Error(`Could not find user with email ${email}`)
  return user
}
