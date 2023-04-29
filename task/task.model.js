import { Schema, model, ObjectId } from "mongoose"

const TaskSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: "User" },
  category: { type: ObjectId, required: true, ref: "Category" },
  order: { type: Number, required: true },
  checked: { type: Boolean, default: false },
})

export default model("Task", TaskSchema)
