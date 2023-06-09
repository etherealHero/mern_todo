import { Router } from "express"
import { check, validationResult } from "express-validator"

import Task from "./task.model.js"
import authMiddleware from "../auth/auth.middleware.js"

const router = Router()

router.post(
  "/create",
  [
    authMiddleware,
    check("title", "Не задано название задачи").notEmpty(),
    check("category", "Не задана категория").notEmpty(),
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
      const { title, category, order, description } = req.body

      const newTask = new Task({
        title,
        category,
        order,
        description,
        owner: id,
      })
      await newTask.save()

      res.status(200).json({ message: "Задача создана" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user

    const tasks = await Task.find({ owner: id }).populate("category", "color")

    res.json(tasks.sort((t1, t2) => (t1.order > t2.order ? -1 : 1)))
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user
    const taskId = req.params.id

    const task = await Task.findOneAndDelete({ owner: id, _id: taskId })

    if (!task) {
      return res.status(400).json({ message: "Что-то пошло не так" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.put(
  "/",
  [
    authMiddleware,
    check("title", "Не задано название задачи").notEmpty(),
    check("category", "Не задана категория").notEmpty(),
    check("order", "Не задан порядковый номер категории").notEmpty(),
    check("checked", "Checked is empty").notEmpty(),
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
      const { title, _id, category, order, checked, description } = req.body

      const task = await Task.findOneAndUpdate(
        { owner: id, _id },
        { title, category, order, checked, description },
        { new: true }
      )

      if (!task) {
        return res.status(400).json({ message: "Что-то пошло не так" })
      }

      res.json(task)
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

router.put(
  "/swap",
  [authMiddleware, check("_id").exists(), check("_id2").exists()],
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
      const { _id, _id2 } = req.body

      const task = await Task.findOne({ _id, owner: id })
      const task2 = await Task.findOne({ _id: _id2, owner: id })
      const swapOrder = task.order
      task.order = task2.order
      task2.order = swapOrder

      await task.save()
      await task2.save()

      res.json("swap success")
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

export default router
