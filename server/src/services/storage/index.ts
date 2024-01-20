import { initializeApp } from 'firebase/app'
import {
  type FirebaseStorage as IFirebaseStorage,
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { env } from 'src/config/env'

type UploadOptions = {
  folder: string
  name: string
  file: File
  public?: boolean
}

export interface Storage {
  upload(options: UploadOptions): Promise<string>
  delete(urls: string | string[]): Promise<void>
}

export class FirebaseStorage implements Storage {
  constructor(private readonly storage: IFirebaseStorage) {}

  async delete(urls: string | string[]): Promise<void> {
    if (urls.length === 0) return

    if (typeof urls === 'string') {
      urls = [urls]
    }

    await Promise.all(urls.map((url) => deleteObject(ref(this.storage, url))))
  }

  async upload(options: UploadOptions): Promise<string> {
    const path = `${options.folder}/${options.name}`
    const fileRef = ref(this.storage, path)

    await uploadBytes(fileRef, await options.file.arrayBuffer(), {
      contentType: options.file.type,
    })

    return getDownloadURL(fileRef)
  }
}

const app = initializeApp({
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
})

export const storage: Storage = new FirebaseStorage(getStorage(app))
