import express from "express"

const userRoutes = express.Router()
  .get("/profile", (req, res) => {
    const userCookie = req.cookies.user

    if (!userCookie) {
      return res.status(401).send("You must login first!")
    }


    const user = JSON.parse(userCookie)
    console.log(user)
    res.send(`Welome, ${user.name}`)
  })

export default userRoutes