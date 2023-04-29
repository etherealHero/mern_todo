import { Schema, model, ObjectId } from "mongoose"

const CategorySchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: "User" },
  order: { type: Number, required: true },
})

export default model("Category", CategorySchema)
