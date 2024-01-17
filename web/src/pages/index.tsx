import {
  CircleStackIcon,
  FolderIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="py-2 border-b border-zinc-900">
        <div className="px-4 lg:px-0 max-w-screen-lg mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">
            Share<span className="text-yellow-500">File</span>
          </h1>
          <div className="flex gap-2">
            <Link className="hover:underline" to="/">
              Sign up
            </Link>
            <Link className="text-yellow-500 underline" to="/">
              Log in
            </Link>
          </div>
        </div>
      </header>
      <main className="px-4 lg:px-0 mb-8 max-w-screen-lg mx-auto">
        <section className="py-24 lg:py-48 flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tighter">
            Share<span className="text-yellow-500">File</span>
          </h1>
          <p className="mb-8">Share your files safely in the internet</p>
          <button className="py-2 px-4 bg-yellow-500 text-black rounded flex gap-1">
            <FolderIcon className="w-5 h-5" />
            <span>Upload files</span>
          </button>
        </section>
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-900">
            <CircleStackIcon className="h-12 w-12 text-yellow-400" />
            <div className="w-full">
              <h2 className="text-2xl font-bold">Store</h2>
              <p className="text-zinc-500 leading-tight">
                Store your files in our secure cloud storage for up to 1GB for
                free
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-900">
            <ShareIcon className="h-12 w-12 text-yellow-400" />
            <div className="w-full">
              <h2 className="text-2xl font-bold">Share</h2>
              <p className="text-zinc-500 leading-tight">
                Share your files with your friends or family through anonymous
                links
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-900">
            <FolderIcon className="h-12 w-12 text-yellow-400" />
            <div className="w-full">
              <h2 className="text-2xl font-bold">Manage</h2>
              <p className="text-zinc-500 leading-tight">
                Manage your files and links through our application dashboard
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
