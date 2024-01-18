import { user } from 'src/shared/auth'
import { files, folders } from 'src/data'

import FolderCard from 'src/components/cards/folders/FolderCard'
import DashboardLayout from 'src/layouts/DashboardLayout'
import FileCard from 'src/components/cards/files/FileCard'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">
          Welcome, {user.name}!
        </h1>
        <p>What's up for today?</p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">Statistics</h2>
        <ul className="grid gap-4 grid-cols-3">
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Files</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              {5} in total
            </h2>
          </li>
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Total access</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              {1032} times
            </h2>
          </li>
          <li className="p-4 border border-zinc-900 rounded-lg">
            <p>Storage used</p>
            <h2 className="text-2xl font-bold tracking-tighter">
              324mb of 1GB (31%)
            </h2>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">
          Latest folders
        </h2>
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
