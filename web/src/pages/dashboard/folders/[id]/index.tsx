import {
  Cog6ToothIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { AppFolder } from 'src/domain/entities'
import DashboardLayout from 'src/layouts/DashboardLayout'

const folder: AppFolder = {
  id: crypto.randomUUID(),
  clicks: 12,
  public: false,
  createdAt: new Date(),
  name: 'Memories',
  updatedAt: new Date(),
}

const files = Array(8)
  .fill(null)
  .map((_, index) => ({
    id: crypto.randomUUID(),
    name: `random_pic_${index}.jpg`,
    size: 561 * (Math.floor(Math.random() * 32) + 1),
    mimeType: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

const toMb = (size: number) => {
  if (size % 1024 === 0) {
    return `${size / 1024}MB`
  }

  return `${(size / 1024).toFixed(2)}MB`
}

const truncate = (text: string, length: number) => {
  if (text.length <= length) {
    return text
  }

  return `${text.substring(0, length)}...`
}

export default function DashboardFolderDetail() {
  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tighter">
          Folder - {folder.name}
        </h1>
        <button className="py-2 px-4 bg-white text-black rounded flex items-center gap-1">
          <PlusIcon className="w-5 h-5" />
          <span>Add file</span>
        </button>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <p>Created at: {folder.createdAt.toLocaleDateString()}</p>
        <div className="flex items-center gap-4">
          <button className="p-2 border border-zinc-800 rounded">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-1 py-2 px-4 border border-zinc-800 rounded hover:border-zinc-800 hover:bg-zinc-900">
            {folder.public ? (
              <LockOpenIcon className="w-5 h-5" />
            ) : (
              <LockClosedIcon className="w-5 h-5" />
            )}
            <span>{folder.public ? 'Public' : 'Private'}</span>
          </button>
        </div>
      </div>
      <ul className="grid">
        <li className="border-b border-zinc-900 py-2 px-4 grid grid-cols-8 gap-2">
          <span className="col-span-4">Filename</span>
          <span>Size</span>
          <span>Created at</span>
          <span>Last modified</span>
        </li>
        {files.map((file) => (
          <li
            key={file.id}
            className="grid grid-cols-8 gap-2 px-4 py-4 border-b border-zinc-900 overflow-hidden hover:bg-gradient-to-r from-black via-zinc-900 to-black"
          >
            <div className="col-span-4 flex items-center gap-2">
              <a className="hover:underline" href={file.url} target="_blank">
                {truncate(file.name, 64)}
              </a>
            </div>
            <span>{toMb(file.size)}</span>
            <span>{file.createdAt.toLocaleDateString()}</span>
            <span>{file.updatedAt.toLocaleDateString()}</span>
            <div className="flex items-center justify-center">
              <button className="p-1 border border-zinc-800 rounded transition ease-in-out hover:bg-red-600 hover:border-red-600 hover:text-white">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  )
}
