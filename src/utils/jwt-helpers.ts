import jwt from 'jsonwebtoken'
import { User } from '../models'

function jwtTokens(user: User) {
  const payload = {
    id: user.id,
    username: user.name,
  }
  // Check only ID, email and pass
  const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '30s',
  }) //15m
  const refreshToken = jwt.sign(
    { payload },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '1m' }
  ) //14 days
  return { accessToken, refreshToken }
}

export { jwtTokens }
