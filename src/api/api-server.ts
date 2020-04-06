require("dotenv").config()
import express from "express"
import { connect, ConnectionOptions } from "mongoose"
import { signupRouter } from "./signup"

const API_PORT = process.env.API_PORT || 5002
const MONGO_URL = process.env.MONGO_URL || ""

const options: ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}

const app = express()

app.use(express.json())
app.use(signupRouter)

const start = async () => {
  try {
    await connect(MONGO_URL, options, (error) => {
      if (error) {
        console.log("Connection to DB Error " + error)
      } else {
        console.log("Connection to DB Success!")
      }
    })
    app.listen(API_PORT, () =>
      console.log(`🚀 Api has been started on http://localhost:` + API_PORT)
    )
  } catch (e) {
    console.log("API server error:" + e)
  }
}

start()
