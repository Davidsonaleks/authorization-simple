import { model, Schema } from "mongoose"

const schema = new Schema({
  login: { type: String, unique: true },
  password: { type: String, min: 6 },
})

export const User = model("User", schema)
