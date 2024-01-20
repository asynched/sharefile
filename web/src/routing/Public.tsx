import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/services/api'
import { auth } from 'src/stores/auth'

export type PublicProps = {
  children: ReactNode
  onLoading?: ReactNode
  redirectTo?: string
}

export default function Public({
  children,
  onLoading,
  redirectTo = '/dashboard',
}: PublicProps) {
  const [state, setState] = useState<'pending' | 'success' | 'error'>('pending')
  const navigate = useNavigate()

  useEffect(() => {
    api.auth
      .getProfile()
      .then((profile) => {
        auth.set(profile)
        setState('success')
        navigate(redirectTo)
      })
      .catch(() => {
        auth.set(null)
        setState('error')
      })
  }, [])

  if (state === 'pending') return onLoading

  if (state === 'error') {
    return children
  }

  return null
}
