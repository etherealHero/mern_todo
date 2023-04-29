import { Router } from "express"
import { check, validationResult } from "express-validator"

import Category from "./category.model.js"
import authMiddleware from "../auth/auth.middleware.js"

const router = Router()

router.post(
  "/create",
  [
    authMiddleware,
    check("title", "Не задано название категории").notEmpty(),
    check("color", "Не задан цвет категории").notEmpty(),
    check("order", "Не задан порядковый номер категории").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Пользовательская ошибка",
        })
      }

      const { id } = req.user
      const { title, color, order } = req.body

      const newCategory = new Category({ title, color, order, owner: id })
      await newCategory.save()

      res.status(200).json({ message: "Категория создана" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user

    const categories = await Category.find({ owner: id })

    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user
    const categoryId = req.params.id

    const category = await Category.findOneAndDelete({
      owner: id,
      _id: categoryId,
    })

    if (!category) {
      return res.status(400).json({ message: "Что-то пошло не так" })
    }

    res.json(category)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.put(
  "/",
  [
    authMiddleware,
    check("title", "Не задано название категории").notEmpty(),
    check("color", "Не задан цвет категории").notEmpty(),
    check("order", "Не задан порядковый номер категории").notEmpty(),
    check("_id").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для обновления",
        })
      }

      const { id } = req.user
      const { title, _id, order, color } = req.body

      const category = await Category.findOneAndUpdate(
        { owner: id, _id },
        { title, color, order },
        { new: true }
      )

      if (!category) {
        return res.status(400).json({ message: "Что-то пошло не так" })
      }

      res.json(category)
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

export default router
