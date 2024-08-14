import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL

const checkAuthStatus = (req: Request, res: Response, next: NextFunction) => {
  const userCookie = req.cookies.user
  console.log(userCookie)

  if (!userCookie) {
    return res.status(401).json({
      message: "User is unauthorized"
    })
  }

  next()
}

export default checkAuthStatus