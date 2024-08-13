import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

/* Middleware imports */
import keepSessionAlive from "./middleware/keepSessionAlive";

/* Route imports */
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(morgan("common"))

app.use("/profile", keepSessionAlive)

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port - ${process.env.PORT}`)
})