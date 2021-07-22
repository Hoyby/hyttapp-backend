import jwt from 'jsonwebtoken'
import { User } from '../models';

function jwtTokens(user: User) {

    const payload = {
        id: user.id,
        username: user.name,
    }
    // Check only ID, email and pass
    const accessToken = jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2m' }) //15m
    const refreshToken = jwt.sign({payload}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '14d' }) //14 days
    return ({ accessToken, refreshToken })
}

export { jwtTokens }
