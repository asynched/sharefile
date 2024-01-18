import { FolderOpenIcon } from '@heroicons/react/24/outline'
import { AppFile } from 'src/domain/entities'

export type FileCardProps = {
  file: AppFile
}

export default function FileCard({ file }: FileCardProps) {
  return (
    <div className="text-zinc-400 text-sm grid grid-cols-8 p-4 border border-zinc-900 rounded-lg">
      <p className="flex gap-2 items-center col-span-4">
        <FolderOpenIcon className="w-4 h-4" />
        <span>{file.name}</span>
      </p>
      <p>{file.folder}</p>
      <p>{(file.size / 1024).toFixed(2)}MB</p>
      <p>{file.createdAt.toLocaleDateString()}</p>
      <p>{file.updatedAt.toLocaleDateString()}</p>
    </div>
  )
}
