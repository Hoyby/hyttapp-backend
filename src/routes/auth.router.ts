import express from 'express'
import { getUser } from '../repositories/auth.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await getUser(email)

    //PASSWORD CHECK
    const validPassword = await bcrypt.compare(password, user!.password)
    if (!validPassword)
      return res.status(401).json({ error: 'incorrect password' })

    //JWT
    const controller = new AuthController()
    let tokens = await controller.getAccessToken(user!)
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 86400000,
      httpOnly: false,
      sameSite: 'none',
      secure: true,
    })
    res.json(tokens)
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
})

router.get('/refresh_token', (req, res) => {
  try {
    //get cookie
    const refreshToken = req.cookies.refresh_token
    if (refreshToken === null)
      return res.status(401).json({ error: 'null refresh token' })

    //check for token match
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (error: any, user: any) => {
        if (error) return res.status(403).json({ error: error.message })
        const controller = new AuthController()
        let tokens = await controller.getRefreshToken(user!)
        res.cookie('refresh_token', tokens.refreshToken, {
          maxAge: 86400000,
          httpOnly: false,
          sameSite: 'none',
          secure: true,
        })
        res.json(tokens)
      }
    )
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
})

router.delete('/refresh_token', (req, res) => {
  try {
    const controller = new AuthController()
    controller.deleteRefreshToken()
    res.clearCookie('refresh_token', {
      maxAge: 86400000,
      httpOnly: false,
      sameSite: 'none',
      secure: true,
    })
    return res.status(200).json({ message: 'refresh token deleted' })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

export default router
