import FileCard from 'src/components/cards/files/FileCard'
import FolderCard from 'src/components/cards/folders/FolderCard'
import DashboardLayout from 'src/layouts/DashboardLayout'
import { FolderIcon, PlusIcon } from '@heroicons/react/24/outline'
import CreateFolderModal from 'src/components/modals/folders/CreateFolderModal'
import { useToggle } from 'src/hooks/useToggle'
import { useQuery } from '@tanstack/react-query'
import { api } from 'src/services/api'

export default function DashboardFolder() {
  const { toggle, next } = useToggle()

  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: api.folders.getFolders,
    initialData: [],
  })

  const { data: files } = useQuery({
    queryKey: ['files'],
    queryFn: api.files.getLatestFiles,
    initialData: [],
  })

  return (
    <DashboardLayout>
      {toggle && <CreateFolderModal onClose={next} onSuccess={next} />}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">Folders</h1>
          <button
            onClick={next}
            className="py-2 px-4 bg-white text-black rounded-lg flex items-center gap-1"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>
        <ul className="grid grid-cols-4 gap-4">
          {folders.map((folder) => (
            <li key={folder.id}>
              <FolderCard folder={folder} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">
          Latest modified files
        </h2>
        {files.length === 0 && (
          <div className="p-8 border-2 border-dashed border-zinc-900 rounded flex items-center justify-center gap-1">
            <FolderIcon className="w-5 h-5" />
            <p className="text-zinc-400">No files available</p>
          </div>
        )}
        {files.length > 0 && (
          <ul className="grid gap-4">
            {files.map((file) => (
              <li key={file.id}>
                <FileCard file={file} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </DashboardLayout>
  )
}
