import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

export type ModalBaseProps = {
  children: ReactNode
  onClose: () => unknown
}

export default function ModalBase({ children, onClose }: ModalBaseProps) {
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm w-full h-screen grid place-items-center">
      <div className="relative border border-zinc-900 bg-black rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute right-8"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6 text-zinc-500" />
        </button>
        {children}
      </div>
    </div>
  )
}
