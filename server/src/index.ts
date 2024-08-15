import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

/* Middleware imports */
import keepSessionAlive from "./middleware/keepSessionAlive";

/* Route imports */
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import checkAuthStatus from "./middleware/checkAuthStatus";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
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