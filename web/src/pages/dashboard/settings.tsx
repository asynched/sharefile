import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline'
import DashboardLayout from 'src/layouts/DashboardLayout'

export default function Settings() {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">Settings</h1>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Storage</h2>
          <p className="mb-2">338MB of 1024MB (31%)</p>
          <div className="h-3 w-full bg-gradient-to-r from-black to-zinc-900 rounded-lg overflow-hidden">
            <div className="w-[31%] bg-gradient-to-br from-purple-500 to-indigo-600 h-3"></div>
          </div>
        </div>
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Files</h2>
          <p>3 folders</p>
          <p>124 files</p>
        </div>
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Account</h2>
          <p className="flex items-center">
            Tier&nbsp;
            <span className="py-[.125rem] px-2 bg-gradient-to-br from-lime-500 to-green-600 rounded-full text-black text-xs">
              Free
            </span>
          </p>
          <p>
            Backups <span className="text-zinc-500">Not supported yet</span>
          </p>
        </div>
      </div>
      <h2 className="mb-4 text-3xl font-bold tracking-tighter">Profile</h2>
      <div className="flex gap-12 items-start">
        <img
          src={`https://github.com/asynched.png`}
          className="w-48 h-48 rounded-full border border-zinc-900"
        />
        <form className="grid grid-cols-2 gap-4 w-[50%]">
          <h3 className="text-2xl font-bold tracking-tighter col-span-2">
            Personal
          </h3>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent border border-zinc-800 rounded py-2 px-4 outline-none transition ease-in-out focus:border-zinc-600"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="E-mail"
              id="email"
              name="email"
              className="w-full bg-transparent border border-zinc-800 rounded py-2 px-4 outline-none transition ease-in-out focus:border-zinc-600"
            />
          </div>
          <button className="col-span-2 flex items-center justify-center gap-1 py-2 border border-zinc-800 rounded transition ease-in-out hover:border-zinc-600">
            <LockClosedIcon className="w-4 h-4" />
            Update password
          </button>
          <button className="col-span-2 py-2 border border-zinc-800 rounded transition ease-in-out hover:bg-white hover:text-black">
            Save changes
          </button>
        </form>
        <div className="border border-zinc-900 p-4 rounded flex-1">
          <h2 className="mb-2 text-2xl font-bold tracking-tighter">
            Share<span className="text-yellow-500">File</span>
          </h2>
          <p className="mb-4 text-zinc-400">
            Share your files on the internet with a single click.
          </p>
          <button className="w-full flex items-center justify-center gap-1 py-2 bg-red-600 text-white rounded">
            <TrashIcon className="w-4 h-4" />
            Delete account
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
