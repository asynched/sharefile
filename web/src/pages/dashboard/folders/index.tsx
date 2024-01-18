import { files, folders } from 'src/data'

import FileCard from 'src/components/cards/files/FileCard'
import FolderCard from 'src/components/cards/folders/FolderCard'
import DashboardLayout from 'src/layouts/DashboardLayout'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function DashboardFolder() {
  return (
    <DashboardLayout>
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">Folders</h1>
          <button className="py-2 px-4 bg-white text-black rounded-lg flex items-center gap-1">
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
        <ul className="grid gap-4">
          {files.map((file) => (
            <li key={file.id}>
              <FileCard file={file} />
            </li>
          ))}
        </ul>
      </section>
    </DashboardLayout>
  )
}
