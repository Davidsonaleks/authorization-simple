import { Router } from "express"

export const testRouter = Router()

testRouter.get("/test", async (_req, res) => {
  return res.status(200).json("Hello")
})
