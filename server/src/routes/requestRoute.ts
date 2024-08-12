import express from "express"

import dotenv from "dotenv"
dotenv.config()

import { OAuth2Client } from "google-auth-library"

export const requestRoute = express.Router()
  .post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectURL = process.env.OAUTHREDIRECTURL

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    )

    console.log(oAuth2Client)

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
      prompt: "consent"
    })

    res.json({
      url: authorizeUrl
    })
  })