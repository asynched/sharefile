import {
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Folder } from 'src/domain/entities'

export type FolderCardProps = {
  folder: Folder
}

const gradients = [
  'from-green-500 to-blue-600',
  'from-yellow-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-purple-500 to-indigo-600',
  'from-red-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-yellow-500 to-lime-600',
  'from-red-500 to-pink-600',
  'from-green-500 to-blue-600',
]

function hash(source: string): number {
  let sum = 0

  for (let i = 0; i < source.length; i++) {
    sum += source.charCodeAt(i)
  }

  return sum
}

export default function FolderCard({ folder }: FolderCardProps) {
  return (
    <div className="border border-zinc-900 rounded-lg overflow-hidden">
      <div
        className={`h-16 bg-gradient-to-br ${
          gradients[hash(folder.id) % gradients.length]
        } border-b border-zinc-900`}
      ></div>
      <div className="p-4 flex flex-col">
        <div className="self-start mb-4 py-1 px-2 bg-black -mt-8 rounded-lg border border-zinc-900">
          <h2 className="text-2xl font-bold tracking-tighter">{folder.name}</h2>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Clicks: {folder.clicks}</p>
          <p className="text-sm text-zinc-400 ">
            Public: {folder.public ? 'Yes' : 'No'}
          </p>
          <p className="mb-4 text-sm text-zinc-400">
            Created at: {folder.createdAt.toLocaleDateString()}
          </p>
          <div className="flex flex-col gap-2 text-zinc-300">
            <Link
              to={`/albums/${folder.id}`}
              className="flex gap-1 items-center"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              <span>Open</span>
            </Link>
            <button className="flex gap-1 items-center">
              <ClipboardIcon className="h-4 w-4" />
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
