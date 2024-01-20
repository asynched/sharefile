import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/services/api'
import { auth } from 'src/stores/auth'

export type PrivateProps = {
  children: ReactNode
  onLoading?: ReactNode
  redirectTo?: string
}

export default function Private({
  children,
  onLoading,
  redirectTo = '/',
}: PrivateProps) {
  const navigate = useNavigate()
  const [state, setState] = useState<'pending' | 'success' | 'error'>('pending')

  useEffect(() => {
    api.auth
      .getProfile()
      .then((profile) => {
        auth.set(profile)
        setState('success')
      })
      .catch(() => {
        auth.set(null)
        setState('error')
        navigate(redirectTo)
      })
  }, [])

  if (state === 'pending') return onLoading

  if (state === 'error') {
    return null
  }

  return children
}
