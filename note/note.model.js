import { Schema, model, ObjectId } from "mongoose"

const NoteModel = new Schema({
  title: { type: String, required: true },
  owner: { type: ObjectId, required: true },
})

export default model("Note", NoteModel)
