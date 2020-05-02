import { Document, model, Schema } from "mongoose"

type TAuthData = Document & {
  id: string
  login: string
  password: string
}

const schema = new Schema({
  login: { type: String, unique: true },
  password: { type: String, min: 6 },
})

export const User = model<TAuthData>("User", schema)
