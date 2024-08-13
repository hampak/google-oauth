import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL

const checkAuthStatus = (req: Request, res: Response, next: NextFunction) => {
  const userCookie = req.cookies.user

  if (userCookie) {
    return res.redirect(`${CLIENT_URL}`)
  }

  next()
}

export default checkAuthStatus