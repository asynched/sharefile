import { AppFile } from 'src/domain/entities'
import ModalBase from '../ModalBase'
import { toFileSize } from 'src/utils/math'
import { truncate } from 'src/utils/strings'

export type PreviewFileModalProps = {
  file: AppFile
  onClose: () => unknown
}

function Preview({ file }: { file: AppFile }) {
  const ext = file.name.split('.').pop()

  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
    return (
      <img
        className="w-full h-64 object-contain border border-zinc-800 rounded-lg"
        src={file.url}
        alt={file.name}
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (ext === 'mp4') {
    return (
      <video
        className="w-full h-64 object-contain border border-zinc-800 rounded-lg"
        src={file.url}
        controls
        preload="metadata"
        poster={file.url}
      />
    )
  }

  return (
    <div className="w-full h-64 bg-zinc-900 flex items-center justify-center rounded">
      <p className="text-zinc-600 text-2xl">No preview available</p>
    </div>
  )
}

export default function PreviewFileModal({
  file,
  onClose,
}: PreviewFileModalProps) {
  return (
    <ModalBase onClose={onClose}>
      <h1 className="mb-4 text-2xl font-bold tracking-tighter">File</h1>
      <div className="mb-2 text-sm text-zinc-400 grid grid-cols-2 gap-1">
        <p>Size: {toFileSize(file.size)}</p>
        <p>Folder: {file.folder}</p>
        <p>Name: {truncate(file.name, 24)}</p>
        <p className="mb-2">Created: {file.createdAt.toLocaleDateString()}</p>
      </div>
      <Preview file={file} />
      <button
        onClick={onClose}
        className="mt-4 flex py-2 px-4 w-full border border-zinc-800 items-center justify-center rounded transition ease-in-out hover:border-zinc-600"
      >
        Close
      </button>
    </ModalBase>
  )
}
