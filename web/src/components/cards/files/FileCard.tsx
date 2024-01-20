import { FolderOpenIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { AppFile } from 'src/domain/entities'
import { toFileSize } from 'src/utils/math'

export type FileCardProps = {
  file: AppFile
}

export default function FileCard({ file }: FileCardProps) {
  return (
    <div className="text-zinc-400 text-sm grid grid-cols-8 p-4 border border-zinc-900 rounded-lg">
      <p className="flex gap-2 items-center col-span-4">
        <FolderOpenIcon className="w-4 h-4" />
        <a href={file.url} target="_blank" className="hover:underline">
          {file.name}
        </a>
      </p>
      <Link
        to={`/dashboard/folders/${file.folderId}`}
        className="hover:underline"
      >
        {file.folder}
      </Link>
      <p>{toFileSize(file.size)}</p>
      <p>{file.createdAt.toLocaleDateString()}</p>
      <p>{file.updatedAt.toLocaleDateString()}</p>
    </div>
  )
}
