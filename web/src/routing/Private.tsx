import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/services/api'
import { auth } from 'src/stores/auth'
import { inspect } from 'src/utils/functional'

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
  const { isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.auth.getProfile().then(inspect(auth.set)),
  })

  useEffect(() => {
    if (!!error) {
      navigate(redirectTo)
    }
  }, [error])

  if (isLoading) {
    return <>{onLoading}</>
  }

  if (error) {
    return null
  }

  return children
}
