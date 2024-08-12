import express from "express"

import dotenv from "dotenv"
dotenv.config()

import { OAuth2Client } from "google-auth-library"

async function getUserData(access_token) {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}")

  const data = await response.json()
  console.log("data", data)
}

export const authRoute = express.Router()
  .get("/", async (req, res, next) => {
    const code = req.query.code

    console.log(code)

    try {
      const redirectURL = process.env.OAUTHREDIRECTURL
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
      )

      const r = await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(r.tokens)
      const user = oAuth2Client.credentials;
      console.log("user", user)
      await getUserData(oAuth2Client.credentials.access_token)
    } catch (error) {
      console.log("Error logging in with OAuth2 user", error)
    }

    res.redirect("http://localhost:5173")
  })