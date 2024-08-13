import express from "express"
import checkAuthStatus from "../middleware/checkAuthStatus"

const userRoutes = express.Router()
  .get("/profile", async (req, res) => {
    const userCookie = req.cookies.user

    if (!userCookie) {
      return res.status(401).send("You must login first!")
    }
    const user = JSON.parse(userCookie)
    res.json({
      username: user?.name
    })
  })

export default userRoutes