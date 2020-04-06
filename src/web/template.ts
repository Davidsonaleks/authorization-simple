import { NextFunction, Request, Response } from "express"

const { WDS_PORT } = process.env

export const spa_middleware = async (_req: Request, _res: Response, _next: NextFunction) => {
  //   req.body = template()
}

export const template = () => `
<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>
  <body>
    <div id="app"></div>
    <script src="${
      WDS_PORT ? `http://localhost:${WDS_PORT}/dist/web.js` : "/dist/web.js"
    }"></script>
    </body>
    </html>`
