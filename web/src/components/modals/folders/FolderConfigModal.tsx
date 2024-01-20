import { ClipboardIcon, FolderIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ModalBase from 'src/components/modals/ModalBase'
import { AppFolder } from 'src/domain/entities'
import { useForm } from 'src/hooks/useForm'
import { api } from 'src/services/api'
import { preventDefault } from 'src/utils/ui'

type FolderConfigModalProps = {
  onClose: () => unknown
  onSuccess: () => unknown
  onDelete: () => unknown
  folder: AppFolder
}

export default function FolderConfigModal({
  onClose,
  onDelete,
  onSuccess,
  folder,
}: FolderConfigModalProps) {
  const { form, register } = useForm({
    name: folder.name,
  })

  const queryClient = useQueryClient()
  const deleteFolder = useMutation({
    mutationFn: () => api.folders.deleteFolder(folder.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      })
      onDelete()
    },
  })

  const updateFolder = useMutation({
    mutationFn: () =>
      api.folders.updateFolder(folder.id, {
        name: form.name,
        public: folder.public,
      }),
    onSuccess: () =>
      queryClient
        .invalidateQueries({
          queryKey: ['folders', folder.id],
        })
        .then(onSuccess),
  })

  return (
    <ModalBase onClose={onClose}>
      <h1 className="mb-2 text-2xl font-bold tracking-tighter">Settings</h1>
      <div className="mb-4 grid grid-cols-2">
        <p className="text-zinc-400 flex items-center gap-1">
          <FolderIcon className="w-4 h-4" />
          Name: {folder.name}
        </p>
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `${window.location.origin}/folders/${folder.id}`
            )
          }
          className="text-zinc-400 flex items-center gap-1"
        >
          <ClipboardIcon className="w-4 h-4" />
          Copy link
        </button>
      </div>
      <form
        onSubmit={preventDefault(() => updateFolder.mutate())}
        className="grid grid-cols-2 gap-4 "
      >
        <div className="col-span-2 flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
            {...register('name')}
          />
        </div>
        <button className="py-2 bg-white text-black rounded">Update</button>
        <button
          onClick={() => deleteFolder.mutate()}
          type="button"
          className="py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onClose}
          className="py-2 border border-zinc-800 hover:border-zinc-600 col-span-2 rounded"
        >
          Close
        </button>
      </form>
    </ModalBase>
  )
}
