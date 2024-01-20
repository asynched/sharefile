import { API_URL } from 'src/config/env'
import { authHeaders } from 'src/services/api/auth'
import { AppFile } from 'src/domain/entities'

export async function getLatestFiles() {
  const response = await fetch(`${API_URL}/files/latest`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Could not fetch latest files')
  }

  const data: AppFile[] = await response.json()

  data.forEach((file) => {
    file.createdAt = new Date(file.createdAt)
    file.updatedAt = new Date(file.updatedAt)
  })

  return data
}

export async function getFiles(folderId: string) {
  const response = await fetch(`${API_URL}/files/${folderId}`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Could not fetch files')
  }

  const data: AppFile[] = await response.json()

  data.forEach((file) => {
    file.createdAt = new Date(file.createdAt)
    file.updatedAt = new Date(file.updatedAt)
  })

  return data
}

export async function createFiles(folderId: string, files: File[]) {
  const formData = new FormData()

  files.forEach((file) => formData.append('files', file))

  const response = await fetch(`${API_URL}/files/${folderId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Could not create files')
  }

  const data: AppFile[] = await response.json()

  data.forEach((file) => {
    file.createdAt = new Date(file.createdAt)
    file.updatedAt = new Date(file.updatedAt)
  })

  return data
}

export async function deleteFile(folderId: string, fileId: string) {
  const response = await fetch(`${API_URL}/files/${folderId}/${fileId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }
}

export async function getPublicFiles(folderId: string) {
  const response = await fetch(`${API_URL}/files/${folderId}/public`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Could not fetch files')
  }

  const data: AppFile[] = await response.json()

  data.forEach((file) => {
    file.createdAt = new Date(file.createdAt)
    file.updatedAt = new Date(file.updatedAt)
  })

  return data
}
