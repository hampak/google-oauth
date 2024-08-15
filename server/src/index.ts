import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

/* Middleware imports */

/* Route imports */
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(morgan("common"))

// app.use("/profile", keepSessionAlive)
// app.use("*", (req, res, next) => {
//   const cookie = req.cookies.user
//   console.log(cookie)
// })
// app.use("/dashboard", checkAuthStatus, (req, res) => {
//   res.send("Welcome to your dashboard")
// })
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port - ${process.env.PORT}`)
})