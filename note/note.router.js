import { Router } from "express"
import bcryptjs from "bcryptjs"
import { check, validationResult } from "express-validator"
import jwt from "jsonwebtoken"

import * as dotenv from "dotenv"
dotenv.config()

import Note from "./note.model.js"
import authMiddleware from "../auth/auth.middleware.js"

const router = Router()

router.post(
  "/create",
  [authMiddleware, check("title", "Заметка не может быть пустой").notEmpty()],
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
      const { title } = req.body

      const newNote = new Note({ title, owner: id })
      await newNote.save()

      res.status(200).json({ message: "Заметка создана" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user

    const notes = await Note.find({ owner: id })

    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user
    const noteId = req.params.id

    const note = await Note.findOneAndDelete({ owner: id, _id: noteId })

    if (!note) {
      return res.status(400).json({ message: "Что-то пошло не так" })
    }

    res.json(note)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
    console.log(error)
  }
})

router.put(
  "/",
  [
    authMiddleware,
    check("title", "Заметка не может быть пустой").notEmpty(),
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
      const { title, _id } = req.body

      const note = await Note.findOneAndUpdate(
        { owner: id, _id },
        { title },
        { new: true }
      )

      if (!note) {
        return res.status(400).json({ message: "Что-то пошло не так" })
      }

      res.json(note)
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
      console.log(error)
    }
  }
)

export default router
