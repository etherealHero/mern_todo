import { Router } from "express"
import bcryptjs from "bcryptjs"
import { check, validationResult } from "express-validator"
import jwt from "jsonwebtoken"

import * as dotenv from "dotenv"
dotenv.config()

import User from "./user.model.js"

const router = Router()

router.post(
  "/registration",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Слишком короткий пароль").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(401).json({ message: "Такой email уже занят" })
      }

      const hashedPassword = await bcryptjs.hash(password, 7)

      const newUser = new User({ email, password: hashedPassword })

      await newUser.save()

      res.status(200).json({ message: "Пользователь создан" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

router.post(
  "/login",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль обязателен для заполнения").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при авторизации",
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res
          .status(401)
          .json({ message: "Пользователь с таким email не существует" })
      }

      const isMatch = await bcryptjs.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          message: "Некорректные данные при авторизации",
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

      res.status(200).json({ token })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

export default router
