import { Link } from 'react-router-dom'
import { user } from 'src/shared/auth'

import {
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline'
import DashboardNavbar from 'src/components/navbar/DashboardNavbar'

const albums = [
  {
    id: crypto.randomUUID(),
    public: false,
    name: 'Memories',
    clicks: 12,
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    public: true,
    name: 'Animals',
    clicks: 103,
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    public: false,
    name: 'Documents',
    clicks: 5,
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    preview: null,
    public: true,
    name: 'Videos',
    clicks: 168,
    createdAt: new Date(),
  },
]

const files = [
  {
    id: crypto.randomUUID(),
    name: 'history.pdf',
    size: 1024,
    folder: 'Documents',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.00.jpeg',
    size: 509,
    folder: 'Animals',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.01.jpeg',
    size: 213,
    folder: 'Memories',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'WhatsApp Image 2021-08-01 at 12.00.02.mp4',
    size: 3021,
    folder: 'Videos',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const gradients = [
  'from-green-500 to-blue-600',
  'from-yellow-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-purple-500 to-indigo-600',
]

export default function Dashboard() {
  return (
    <div className="w-full h-screen flex">
      <DashboardNavbar />
      <main className="py-6 w-full h-screen overflow-auto">
        <div className="max-w-screen-lg w-full mx-auto">
          <section className="mb-8">
            <h1 className="text-4xl font-bold tracking-tighter">
              Welcome, {user.name}!
            </h1>
            <p>What's up for today?</p>
          </section>
          <section className="mb-8">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter">
              Statistics
            </h2>
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
              {albums.map((album, index) => (
                <li
                  key={album.id}
                  className="border border-zinc-900 rounded-lg overflow-hidden"
                >
                  <div
                    className={`h-16 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    } border-b border-zinc-900`}
                  ></div>
                  <div className="p-4 flex flex-col">
                    <div className="self-start mb-4 py-1 px-2 bg-black -mt-8 rounded-lg border border-zinc-900">
                      <h2 className="text-2xl font-bold tracking-tighter">
                        {album.name}
                      </h2>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">
                        Clicks: {album.clicks}
                      </p>
                      <p className="text-sm text-zinc-500 ">
                        Public: {album.public ? 'Yes' : 'No'}
                      </p>
                      <p className="mb-4 text-sm text-zinc-500">
                        Created at: {album.createdAt.toLocaleDateString()}
                      </p>
                      <div className="flex flex-col gap-2 text-zinc-300">
                        <Link
                          to={`/albums/${album.id}`}
                          className="flex gap-1 items-center"
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          <span>Open</span>
                        </Link>
                        <button className="flex gap-1 items-center">
                          <ClipboardIcon className="h-4 w-4" />
                          <span>Copy link</span>
                        </button>
                      </div>
                    </div>
                  </div>
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
                <li className="text-zinc-400 text-sm grid grid-cols-8 p-4 border border-zinc-900 rounded-lg">
                  <p className="flex gap-2 items-center col-span-4">
                    <FolderOpenIcon className="w-4 h-4" />
                    <span>{file.name}</span>
                  </p>
                  <p>{file.folder}</p>
                  <p>{(file.size / 1024).toFixed(2)}MB</p>
                  <p>{file.createdAt.toLocaleDateString()}</p>
                  <p>{file.updatedAt.toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
