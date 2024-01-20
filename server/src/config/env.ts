import { object, string } from 'zod'

const envSchema = object({
  DATABASE_URL: string().url(),
  DATABASE_AUTH_TOKEN: string(),
  FIREBASE_API_KEY: string(),
  FIREBASE_AUTH_DOMAIN: string(),
  FIREBASE_PROJECT_ID: string(),
  FIREBASE_STORAGE_BUCKET: string(),
  FIREBASE_MESSAGING_SENDER_ID: string(),
  FIREBASE_APP_ID: string(),
  FIREBASE_MEASUREMENT_ID: string(),
})

export const env = envSchema.parse(process.env)
