import dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
  PORT: num({default: 3001}),
  MONGO_URI: str({desc: "Mongo Uri not found"})
})