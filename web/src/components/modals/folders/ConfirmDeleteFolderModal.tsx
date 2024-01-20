import { useMutation, useQueryClient } from '@tanstack/react-query'
import ModalBase from '../ModalBase'
import { api } from 'src/services/api'

export type ConfirmDeleteFolderModalProps = {
  onClose: () => unknown
  onDelete?: () => unknown
  folderId: string
}

export default function ConfirmDeleteFolderModal({
  onClose,
  folderId,
  onDelete,
}: ConfirmDeleteFolderModalProps) {
  const queryClient = useQueryClient()

  const deleteFolder = useMutation({
    mutationFn: () => api.folders.deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      })

      onDelete?.()
    },
  })

  return (
    <ModalBase onClose={onClose}>
      <h1 className="text-2xl font-bold tracking-tighter">Delete folder</h1>
      <p className="mb-4">
        Are you sure you want to delete
        <br />
        this folder?
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={deleteFolder.isPending}
          onClick={() => deleteFolder.mutate()}
          className="py-2 bg-red-600 rounded"
        >
          Delete
        </button>
        <button onClick={onClose} className="py-2 bg-white text-black  rounded">
          Cancel
        </button>
      </div>
    </ModalBase>
  )
}
