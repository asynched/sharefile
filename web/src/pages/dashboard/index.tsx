import { auth } from 'src/stores/auth'
import { api } from 'src/services/api'
import { useStore } from 'src/hooks/useStore'
import { useQuery } from '@tanstack/react-query'
import { percentage, toFileSize } from 'src/utils/math'

import FolderCard from 'src/components/cards/folders/FolderCard'
import DashboardLayout from 'src/layouts/DashboardLayout'
import FileCard from 'src/components/cards/files/FileCard'
import { FolderIcon } from '@heroicons/react/24/outline'
import { MAX_USER_STORAGE_IN_BYTES } from 'src/config/env'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const user = useStore(auth)!
  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: api.folders.getFolders,
    initialData: [],
  })

  const { data: stats } = useQuery({
    queryKey: ['statistics'],
    queryFn: api.statistics.getStatistics,
    initialData: {
      files: 0,
      access: 0,
      storage: 0,
      folders: 0,
    },
  })

  const { data: files } = useQuery({
    queryKey: ['latestFiles'],
    queryFn: api.files.getLatestFiles,
    initialData: [],
  })

  return (
    <DashboardLayout>
      <section className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">
          Welcome, {user?.firstName}!
        </h1>
        <p>What's up for today?</p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">Statistics</h2>
        <ul className="grid gap-4 grid-cols-3">
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Files</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              {stats.files} in total
            </h2>
          </li>
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Total access</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              {stats.access} times
            </h2>
          </li>
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Storage used</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              {toFileSize(stats.storage)} of{' '}
              {toFileSize(MAX_USER_STORAGE_IN_BYTES)} (
              {percentage(stats.storage, MAX_USER_STORAGE_IN_BYTES).toFixed(2)}
              %)
            </h2>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">
          Latest folders
        </h2>
        {folders.length === 0 && (
          <div className="p-8 border-2 border-dashed border-zinc-900 rounded flex items-center justify-center gap-1">
            <FolderIcon className="w-5 h-5" />
            <p className="text-zinc-400">
              No folders available,{' '}
              <Link
                className="text-white hover:underline"
                to="/dashboard/folders"
              >
                create one here
              </Link>
              .
            </p>
          </div>
        )}
        {folders.length > 0 && (
          <ul className="grid grid-cols-4 gap-4">
            {folders.map((folder) => (
              <li key={folder.id}>
                <FolderCard folder={folder} />
              </li>
            ))}
          </ul>
        )}
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
