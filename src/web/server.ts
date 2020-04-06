import express from "express"
require("dotenv").config()

const PORT = process.env.PORT || 5000

const { WDS_PORT } = process.env

const app = express()

app.use(express.json({}))

app.get("/", (_req, res) => {
  res.end(`
  <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app"></div>
      <script src="${
        WDS_PORT ? `http://localhost:${WDS_PORT}/dist/main.js` : "/dist/web.js"
      }"></script>
      </body>
      </html>`)
})

app.listen(PORT, () => console.log(`Web had benn started on http://localhost:` + PORT))
