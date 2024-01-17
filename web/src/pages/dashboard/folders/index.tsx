import FolderCard from 'src/components/cards/folders/FolderCard'
import { folders } from 'src/data'
import DashboardLayout from 'src/layouts/DashboardLayout'

export default function DashboardFolder() {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">Folders</h1>
      <ul className="grid grid-cols-4 gap-4">
        {folders.map((folder) => (
          <li key={folder.id}>
            <FolderCard folder={folder} />
          </li>
        ))}
      </ul>
    </DashboardLayout>
  )
}
