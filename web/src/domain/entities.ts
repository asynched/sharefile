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
  folder: string
  createdAt: Date
  updatedAt: Date
}
