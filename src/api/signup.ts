import { hash } from "bcrypt"
import { Router } from "express"
import { loginValidator, passwordValidator } from "../utils/validator"
import { User } from "./user-schema"

export const signupRouter = Router()

signupRouter.post("/signup", async (req, res) => {
  const { login, password } = req.body

  if (!loginValidator(login) || !passwordValidator(password)) {
    return res.status(400).json({ message: "Некорректные данные" })
  }

  const candidate = await User.findOne({ login })
  if (candidate) {
    return res.status(400).json({ message: "Пользователь уже есть" })
  }

  const hashPassword = await hash(password, 12)

  const new_user = new User({
    login,
    password: hashPassword,
  })
  await new_user.save()

  res.status(201).json({ message: "Пользователь создан" })
})
