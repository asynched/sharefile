import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MAX_USER_STORAGE_IN_BYTES } from 'src/config/env'
import { useForm } from 'src/hooks/useForm'
import { useStore } from 'src/hooks/useStore'
import DashboardLayout from 'src/layouts/DashboardLayout'
import { api } from 'src/services/api'
import { auth } from 'src/stores/auth'
import { percentage, toFileSize } from 'src/utils/math'
import { preventDefault } from 'src/utils/ui'

export default function Settings() {
  const user = useStore(auth)!

  const { form, register } = useForm({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  })

  const { data: stats } = useQuery({
    queryKey: ['usage'],
    queryFn: api.statistics.getStatistics,
    initialData: {
      files: 0,
      access: 0,
      storage: 0,
      folders: 0,
    },
  })

  const updateProfile = useMutation({
    mutationFn: () => api.auth.updateProfile(form),
    onSuccess: () => api.auth.getProfile().then(auth.set),
  })

  const usagePercentage = useMemo(() => {
    return percentage(stats.storage, MAX_USER_STORAGE_IN_BYTES)
  }, [stats.storage])

  return (
    <DashboardLayout title="ShareFile | Settings">
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">Settings</h1>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Storage</h2>
          <p className="mb-2">
            {toFileSize(stats.storage)} of{' '}
            {toFileSize(MAX_USER_STORAGE_IN_BYTES)} (
            {usagePercentage.toFixed(2)}%)
          </p>
          <div className="h-3 w-full bg-gradient-to-r from-black to-zinc-900 rounded-lg overflow-hidden">
            <div
              className="bg-gradient-to-br from-purple-500 to-indigo-600 h-3"
              style={{
                width: `${usagePercentage}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Files</h2>
          <p>{stats.folders} folders</p>
          <p>{stats.files} files</p>
        </div>
        <div className="p-4 border border-zinc-900 rounded-lg">
          <h2 className="text-2xl font-bold tracking-tighter">Account</h2>
          <p className="flex items-center">
            Tier&nbsp;
            <span className="py-[.125rem] px-2 bg-gradient-to-br from-lime-500 to-green-600 rounded-full text-black text-xs">
              {user.tier}
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
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}`}
          className="w-48 h-48 rounded-full border border-zinc-900"
        />
        <form
          onClick={preventDefault(() => updateProfile.mutate())}
          className="grid grid-cols-2 gap-4 w-[50%]"
        >
          <h3 className="text-2xl font-bold tracking-tighter col-span-2">
            Personal
          </h3>
          <div className="grid gap-1">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="firstName"
              className="w-full bg-transparent border border-zinc-800 rounded py-2 px-4 outline-none transition ease-in-out focus:border-zinc-600"
              {...register('firstName')}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="lastName"
              className="w-full bg-transparent border border-zinc-800 rounded py-2 px-4 outline-none transition ease-in-out focus:border-zinc-600"
              {...register('lastName')}
            />
          </div>

          <div className="grid gap-1 col-span-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="E-mail"
              id="email"
              name="email"
              className="w-full bg-transparent border border-zinc-800 rounded py-2 px-4 outline-none transition ease-in-out focus:border-zinc-600"
              {...register('email')}
            />
          </div>
          <button
            type="button"
            className="col-span-2 flex items-center justify-center gap-1 py-2 border border-zinc-800 rounded transition ease-in-out hover:border-zinc-600"
          >
            <LockClosedIcon className="w-4 h-4" />
            Update password
          </button>
          <button
            disabled={updateProfile.isPending}
            className="col-span-2 py-2 border border-zinc-800 rounded transition ease-in-out hover:bg-white hover:text-black"
          >
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
