import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, ElementRef, useRef } from 'react'
import ModalBase from 'src/components/modals/ModalBase'
import Spinner from 'src/components/spinners/Spinner'
import { api } from 'src/services/api'
import { preventDefault } from 'src/utils/ui'

type CreateFileModalProps = {
  onClose: () => unknown
  folderId: string
}

export default function CreateFileModal({
  onClose,
  folderId,
}: CreateFileModalProps) {
  const [files, setFiles] = useState<FileList | null>(null)
  const fileRef = useRef<ElementRef<'input'>>(null)

  const queryClient = useQueryClient()
  const createFile = useMutation({
    mutationFn: () => api.files.createFiles(folderId, Array.from(files ?? [])),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders', folderId],
      })
      onClose()
    },
  })

  return (
    <ModalBase onClose={onClose}>
      <h1 className="mb-2 text-2xl font-bold tracking-tighter">Create file</h1>
      <form
        onSubmit={preventDefault(() => createFile.mutate())}
        className="grid grid-cols-2 gap-4"
      >
        <div className="grid gap-1 col-span-2">
          <label htmlFor="files">Files</label>
          <button
            onClick={() => fileRef.current?.click()}
            type="button"
            className="w-72 py-4 text-center border-2 border-dashed border-zinc-900 rounded"
          >
            {files?.length ? (
              <p>
                {files.length} file{files.length > 0 && 's'} selected
              </p>
            ) : (
              <p>No files selected</p>
            )}
          </button>
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            onChange={(event) => setFiles(event.target.files)}
            multiple
          />
        </div>
        <button
          disabled={createFile.isPending}
          className="py-2 bg-white text-black rounded disabled:bg-zinc-300 flex items-center justify-center gap-1"
        >
          <span>Save</span>
          {createFile.isPending && <Spinner mode="light" />}
        </button>
        <button
          type="button"
          className="py-2 border border-zinc-800 rounded transition ease-in-out hover:border-zinc-600"
          onClick={onClose}
          disabled={createFile.isPending}
        >
          Close
        </button>
      </form>
    </ModalBase>
  )
}
