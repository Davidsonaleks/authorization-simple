require("dotenv").config()
import express from "express"

const API_PORT = process.env.API_PORT || 5002

const app = express()

app.listen(API_PORT, () => console.log(`🚀 Api has been started on http://localhost:` + API_PORT))
