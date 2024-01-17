import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { user } from 'src/shared/auth'

export default function DashboardNavbar() {
  return (
    <nav className="flex flex-col w-72 border-r border-zinc-900">
      <div className="p-6">
        <h1 className="text-4xl font-bold tracking-tighter">
          Share<span className="text-yellow-500">File</span>
        </h1>
        <p className="mb-8">Share files on the internet</p>
        <ul className="grid gap-4 text-zinc-300">
          <li className="p-3 rounded-lg transition ease-in-out hover:bg-zinc-900">
            <Link className="flex gap-2 items-center" to="/dashboard">
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>
          <li className="p-3 rounded-lg transition ease-in-out hover:bg-zinc-900">
            <Link className="flex gap-2 items-center" to="/dashboard/files">
              <FolderIcon className="w-5 h-5" />
              <span>Folders</span>
            </Link>
          </li>
          <li className="p-3 rounded-lg transition ease-in-out hover:bg-zinc-900">
            <Link className="flex gap-2 items-center" to="/dashboard/settings">
              <Cog6ToothIcon className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto py-3 px-3 border-t border-zinc-900 flex items-center gap-2">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center gap-2 justify-between w-full">
          <div>
            <p>
              {user.name}{' '}
              <span className="text-xs text-zinc-700">({user.tier})</span>
            </p>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
          <button>
            <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
