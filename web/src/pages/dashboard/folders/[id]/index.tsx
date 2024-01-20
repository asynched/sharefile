import {
  Cog6ToothIcon,
  FolderIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import CreateFileModal from 'src/components/modals/folders/CreateFileModal'
import FolderConfigModal from 'src/components/modals/folders/FolderConfigModal'
import Spinner from 'src/components/spinners/Spinner'
import { AppFolder } from 'src/domain/entities'
import { useToggle } from 'src/hooks/useToggle'
import DashboardLayout from 'src/layouts/DashboardLayout'
import { api } from 'src/services/api'
import { toFileSize } from 'src/utils/math'
import { truncate } from 'src/utils/strings'

type PageParams = {
  id: string
}

export default function DashboardFolderDetail() {
  const params = useParams() as PageParams
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { toggle: folderModal, next: toggleFolderModal } = useToggle()
  const { toggle: fileModal, next: toggleFileModal } = useToggle()

  const { data: folder } = useQuery({
    queryKey: ['folders', params.id],
    queryFn: () => api.folders.getFolder(params.id),
  })

  const { data: files } = useQuery({
    queryKey: ['folders', params.id, 'files'],
    queryFn: () => api.files.getFiles(params.id),
    initialData: [],
  })

  const deleteFile = useMutation({
    mutationFn: (fileId: string) => api.files.deleteFile(folder?.id!, fileId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['folders', params.id, 'files'],
      }),
  })

  const updateVisibility = useMutation({
    mutationFn: () => api.folders.updateVisibility(params.id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['folders', params.id],
      }),
  })

  if (!folder) {
    return null
  }

  return (
    <DashboardLayout>
      {folder && fileModal && (
        <CreateFileModal folderId={folder.id} onClose={toggleFileModal} />
      )}
      {folder && folderModal && (
        <FolderConfigModal
          folder={folder}
          onClose={toggleFolderModal}
          onSuccess={toggleFolderModal}
          onDelete={() => navigate('/dashboard')}
        />
      )}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tighter">
          Folder - {folder.name}
        </h1>
        <button
          onClick={toggleFileModal}
          className="py-2 px-4 bg-white text-black rounded flex items-center gap-1"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add file</span>
        </button>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <p>Created at: {folder.createdAt.toLocaleDateString()}</p>
        <div className="flex items-center gap-4">
          <button
            aria-label="Open settings"
            className="p-2 border border-zinc-800 rounded"
            onClick={toggleFolderModal}
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateVisibility.mutate()}
            disabled={updateVisibility.isPending}
            className="flex items-center gap-2 py-2 px-4 border border-zinc-800 rounded hover:border-zinc-800 hover:bg-zinc-900 disabled:bg-black"
          >
            {updateVisibility.isPending && <Spinner mode="dark" />}
            {!updateVisibility.isPending &&
              (folder.public ? (
                <LockOpenIcon className="w-5 h-5" />
              ) : (
                <LockClosedIcon className="w-5 h-5" />
              ))}
            <span>{folder.public ? 'Public' : 'Private'}</span>
          </button>
        </div>
      </div>
      {files.length === 0 && (
        <div className="p-8 border-2 border-dashed border-zinc-900 rounded flex items-center justify-center gap-1">
          <FolderIcon className="w-5 h-5" />
          <p className="text-zinc-400">
            No files available,{' '}
            <button
              onClick={toggleFileModal}
              className="text-white hover:underline"
            >
              click here
            </button>{' '}
            to create one.
          </p>
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
                <a className="hover:underline" href={file.url} target="_blank">
                  {truncate(file.name, 64)}
                </a>
              </div>
              <span>{toFileSize(file.size)}</span>
              <span>{file.createdAt.toLocaleDateString()}</span>
              <span>{file.updatedAt.toLocaleDateString()}</span>
              <div className="flex items-center justify-center">
                <button
                  aria-label="Delete file"
                  className="p-1 border border-zinc-800 rounded transition ease-in-out hover:bg-red-600 hover:border-red-600 hover:text-white"
                  onClick={() => deleteFile.mutate(file.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  )
}
