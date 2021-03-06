import bcrypt from "bcrypt"
import { Router } from "express"
import jwtToken from "jsonwebtoken"
import { loginValidator, passwordValidator } from "../utils/validator"
import { User } from "./user-schema"
require("dotenv").config()

export const authRouter = Router()

authRouter.post("/signup", async (req, res) => {
  try {
    const { login, password } = req.body

    if (!loginValidator(login) || !passwordValidator(password) || !login || !password) {
      return res.status(400).json({ message: "Некорректные данные" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const candidate = await User.findOne({ login })
    if (candidate) {
      return res.status(400).json({ message: "Пользователь уже есть" })
    }

    const new_user = new User({
      login,
      password: hashPassword,
    })
    await new_user.save()

    return res.status(201).json({ message: "Пользователь создан" })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Ошибка сервера" })
  }
})

authRouter.post("/signin", async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return res.status(400).json({ message: "Некорректные данные" })
    }

    const user = await User.findOne({ login })
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" })
    }

    const isPasswordNatched = await bcrypt.compare(password, user.password)

    if (!isPasswordNatched) {
      return res.status(400).json({ message: "Неверный пароль" })
    }

    const secret = process.env.JWT_SECRET || ""

    const token = jwtToken.sign({ id: user.id }, secret, { expiresIn: "10h" })

    return res.status(201).json({ token, userId: user.id, message: "Вы вошли" })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Ошибка сервера" })
  }
})

authRouter.post("/isAuth", async (req, res) => {
  try {
    const { userToken } = req.body
    const secret = process.env.JWT_SECRET || ""
    const verify: any = jwtToken.verify(userToken, secret)
    if (!verify.id) {
      return res.status(400).json({ message: "Некорректные данные", isAuth: false })
    }

    const user = await User.findById(verify.id)
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден", isAuth: false })
    }

    return res.status(201).json({ isAuth: true, message: "Вы вошли" })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Invalid Token", isAuth: false })
  }
})
