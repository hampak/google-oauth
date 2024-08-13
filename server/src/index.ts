import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import keepSessionAlive from "./middleware/keepSessionAlive";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/profile", keepSessionAlive)



app.get('/profile', (req, res) => {
  const userCookie = req.cookies.user

  if (!userCookie) {
    return res.status(401).send("You must login first!")
  }

  const user = JSON.parse(userCookie)
  res.send(`Welcome, ${user.name}`)
})

app.get("/logout", (req, res) => {
  res.clearCookie("user")
  res.send("You have logged out!")
})

app.listen(8000, () => {
  console.log("server running on port 8000")
})