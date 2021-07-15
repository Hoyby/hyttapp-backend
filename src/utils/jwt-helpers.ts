import jwt from 'jsonwebtoken'
import { IAuthPayload } from "../repositories/auth.repository";

function jwtTokens(user: IAuthPayload) {
    // Check only ID, email and pass
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2m' }) //15m
    const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '14d' }) //14 days
    return ({ accessToken, refreshToken })
}

export { jwtTokens }
