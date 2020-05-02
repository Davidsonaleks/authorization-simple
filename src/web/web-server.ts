require("dotenv").config()
import cors from "cors"
import express from "express"

const PORT = process.env.PORT || 5000
const WDS_PORT = process.env.WDS_PORT || 5001

const app = express()

app.use(express.json())
app.use(cors())

app.get("*", (_req, res) => {
  res.end(`
  <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app"></div>
      <script src="${
        WDS_PORT ? `http://localhost:${WDS_PORT}/dist/main.js` : "/dist/main.js"
      }"></script>
      </body>
      </html>`)
})

app.listen(PORT, () => console.log(`🚀 Web has been started on http://localhost:` + PORT))
