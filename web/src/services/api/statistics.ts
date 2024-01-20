import { API_URL } from 'src/config/env'
import { authHeaders } from 'src/services/api/auth'

type Statistics = {
  access: number
  files: number
  folders: number
  storage: number
}

export async function getStatistics() {
  const response = await fetch(`${API_URL}/statistics`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error getting statistics')
  }

  const data: Statistics = await response.json()

  return data
}

type StorageUsage = {
  storage: number
}

export async function getStorageUsage() {
  const response = await fetch(`${API_URL}/statistics/usage`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error getting storage usage')
  }

  const data: StorageUsage = await response.json()

  return data
}
