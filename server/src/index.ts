import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import { requestRoute } from "./routes/requestRoute"
import { authRoute } from "./routes/oAuth"

dotenv.config()

const app = express()

app.options("*", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", ['X-Requested-With', 'content-type', 'credentials']);
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.status(200);
  next()
})


app.use(express.json())
app.use(morgan("common"))
app.use(cors())
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST"]
// }))

/* AUTH IMPORTS */
app.use("/request", requestRoute)
app.use("/oauth", authRoute)

app.get("/", async (req, res) => {
  res.send("Sup bitch")
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port - ${process.env.PORT}`)
})