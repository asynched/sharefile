import { put, del } from '@vercel/blob'

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

export class VercelStorage implements Storage {
  constructor(private readonly token: string) {
    this.token = token
  }

  async delete(urls: string | string[]) {
    if (urls.length === 0) return

    await del(urls, {
      token: this.token,
    })
  }

  async upload(options: UploadOptions) {
    const path = `${options.folder}/${options.name}`

    const { url } = await put(path, options.file, {
      // TODO: Allow for private uploads
      access: 'public',
      contentType: options.file.type,
      token: this.token,
    })

    return url
  }
}
