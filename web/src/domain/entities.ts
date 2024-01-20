export type AppFolder = {
  id: string
  public: boolean
  name: string
  clicks: number
  createdAt: Date
  updatedAt: Date
}

export type AppFile = {
  id: string
  name: string
  size: number
  url: string
  folder: string
  userId: number
  folderId: string
  createdAt: Date
  updatedAt: Date
}

export type Profile = {
  id: number
  firstName: string
  lastName: string
  email: string
  tier: 'free' | 'pro'
  createdAt: Date
  updatedAt: Date
}
