import {
  FolderIcon,
  LockClosedIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PreviewFileModal from 'src/components/modals/folders/PreviewFileModal'
import Spinner from 'src/components/spinners/Spinner'
import Title from 'src/components/utils/Title'
import { AppFile } from 'src/domain/entities'
import { useToggle } from 'src/hooks/useToggle'
import { api } from 'src/services/api'
import { toFileSize } from 'src/utils/math'
import { truncate } from 'src/utils/strings'

type PublicFolderDetailsParams = {
  folderId: string
}

export default function PublicFolderDetails() {
  const params = useParams() as PublicFolderDetailsParams

  const { toggle, next } = useToggle(false)
  const [file, setFile] = useState<AppFile>()

  const { data: folder, error } = useQuery({
    queryKey: ['publicFolders', params.folderId],
    queryFn: () => api.folders.getPublicFolder(params.folderId),
  })

  const { data: files } = useQuery({
    queryKey: ['publicFolders', params.folderId, 'files'],
    queryFn: () => api.files.getPublicFiles(params.folderId),
    initialData: [],
  })

  if (error) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div>
          <LockClosedIcon className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
          <h1 className="mb-2 text-center text-4xl font-bold tracking-tighter">
            Permission error
          </h1>
          <p className="mb-1 text-center">
            You don't have access to this folder
          </p>
          <Link to="/" className="block text-center text-yellow-500 underline">
            Go back
          </Link>
        </div>
      </div>
    )
  }

  if (!folder) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tighter">Loading</h1>
          <p className="mb-2">Please wait</p>
          <Spinner mode="dark" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Title title="ShareFile | Share files online" />
      {toggle && file && <PreviewFileModal onClose={next} file={file} />}
      <header className="py-2 border-b border-zinc-900">
        <div className="px-4 lg:px-0 max-w-screen-lg mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">
            Share<span className="text-yellow-500">File</span>
          </h1>
          <div className="flex gap-2">
            <Link className="hover:underline" to="/auth/sign-up">
              Sign up
            </Link>
            <Link className="text-yellow-500 underline" to="/auth/sign-in">
              Log in
            </Link>
          </div>
        </div>
      </header>
      <div className="py-8 max-w-screen-lg mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">
            Folder - {folder.name}
          </h1>
        </div>
        <div className="mb-8 flex justify-between items-center">
          <p>Created at: {folder.createdAt.toLocaleDateString()}</p>
        </div>
        {files.length === 0 && (
          <div className="p-8 border-2 border-dashed border-zinc-900 rounded flex items-center justify-center gap-1">
            <FolderIcon className="w-5 h-5" />
            <p className="text-zinc-400">No files available</p>
          </div>
        )}
        {files.length > 0 && (
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
                  <a
                    className="hover:underline"
                    href={file.url}
                    target="_blank"
                  >
                    {truncate(file.name, 64)}
                  </a>
                </div>
                <span>{toFileSize(file.size)}</span>
                <span>{file.createdAt.toLocaleDateString()}</span>
                <span>{file.updatedAt.toLocaleDateString()}</span>
                <div className="flex items-center justify-center">
                  <button
                    aria-label="Preview"
                    title="Preview"
                    className="p-1 border-zinc-900 border rounded transition ease-in-out hover:bg-white hover:text-black"
                    onClick={() => {
                      setFile(file)
                      next()
                    }}
                  >
                    <VideoCameraIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
