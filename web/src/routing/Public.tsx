import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/services/api'
import { auth } from 'src/stores/auth'
import { inspect } from 'src/utils/functional'

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
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.auth.getProfile().then(inspect(auth.set)),
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!!data) {
      navigate(redirectTo)
    }
  }, [data])

  if (isLoading) {
    return <>{onLoading}</>
  }

  if (data) {
    return null
  }

  return <>{children}</>
}
