import { useMutation, useQueryClient } from '@tanstack/react-query'
import ModalBase from 'src/components/modals/ModalBase'
import Spinner from 'src/components/spinners/Spinner'
import { useForm } from 'src/hooks/useForm'
import { api } from 'src/services/api'
import { preventDefault } from 'src/utils/ui'

export type CreateFolderModalProps = {
  onClose: () => unknown
  onSuccess: () => unknown
}

export default function CreateFolderModal({
  onClose,
  onSuccess,
}: CreateFolderModalProps) {
  const client = useQueryClient()

  const { form, register } = useForm({
    name: '',
  })

  const createFolder = useMutation({
    mutationFn: () => api.folders.createFolder(form),
    onSuccess: () => {
      client
        .invalidateQueries({
          queryKey: ['folders'],
        })
        .then(onSuccess)
    },
  })

  return (
    <ModalBase onClose={onClose}>
      <h1 className="mb-2 text-2xl font-bold tracking-tighter">
        Create folder
      </h1>
      <form
        onSubmit={preventDefault(() => createFolder.mutate())}
        className="grid gap-4"
      >
        <div className="col-span-2 flex flex-col gap-1">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Folder name"
            className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
            {...register('name')}
          />
        </div>
        <button
          disabled={createFolder.isPending}
          className="flex items-center justify-center gap-1 py-2 bg-white text-black rounded disabled:bg-zinc-300"
        >
          Create
          {createFolder.isPending && <Spinner />}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="py-2 border rounded border-zinc-800 transition ease-in-out hover:border-zinc-600"
        >
          Close
        </button>
      </form>
    </ModalBase>
  )
}
