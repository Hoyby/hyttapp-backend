import jwt from 'jsonwebtoken'

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({ error: 'null token' })
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (error: any, user: any) => {
      if (error) return res.status(403).json({ error: error.message })
      req.user = user
      next()
    }
  )
}

export { authenticateToken }
