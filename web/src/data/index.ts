import { AppFile, AppFolder } from 'src/domain/entities'

export const folders: AppFolder[] = [
  {
    id: crypto.randomUUID(),
    public: false,
    name: 'Memories',
    clicks: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    public: true,
    name: 'Animals',
    clicks: 103,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    public: false,
    name: 'Documents',
    clicks: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    public: true,
    name: 'Videos',
    clicks: 168,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const files: AppFile[] = [
  {
    id: crypto.randomUUID(),
    name: 'history.pdf',
    size: 1024,
    folder: 'Documents',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.00.jpeg',
    size: 509,
    folder: 'Animals',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.01.jpeg',
    size: 213,
    folder: 'Memories',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.02.mp4',
    size: 3021,
    folder: 'Videos',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
