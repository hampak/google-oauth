import { NextFunction, Request, Response } from "express";

const COOKIE_NAME = "user"
const MAX_AGE = 5 * 60 * 1000 // 5 minutes

const keepSessionAlive = (req: Request, res: Response, next: NextFunction) => {
  const userCookie = req.cookies[COOKIE_NAME]

  if (userCookie) {
    res.cookie(COOKIE_NAME, userCookie, {
      httpOnly: true,
      maxAge: MAX_AGE
    })
  }
  next()
}

export default keepSessionAlive