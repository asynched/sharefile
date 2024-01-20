import { API_URL } from 'src/config/env'
import { AppFolder } from 'src/domain/entities'
import { authHeaders } from 'src/services/api/auth'

export async function getFolders() {
  const response = await fetch(`${API_URL}/folders`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error fetching folders')
  }

  const data: AppFolder[] = await response.json()

  data.forEach((folder) => {
    folder.createdAt = new Date(folder.createdAt)
    folder.updatedAt = new Date(folder.updatedAt)
  })

  return data
}

export async function getFolder(id: string) {
  const response = await fetch(`${API_URL}/folders/${id}`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error fetching folder')
  }

  const folder: AppFolder = await response.json()

  folder.createdAt = new Date(folder.createdAt)
  folder.updatedAt = new Date(folder.updatedAt)

  return folder
}

export type CreateFolderDto = {
  name: string
}

export async function createFolder(data: CreateFolderDto) {
  const response = await fetch(`${API_URL}/folders`, {
    method: 'POST',
    headers: authHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error creating folder')
  }

  const folder: AppFolder = await response.json()

  folder.createdAt = new Date(folder.createdAt)
  folder.updatedAt = new Date(folder.updatedAt)

  return folder
}

export async function updateVisibility(folderId: string) {
  const response = await fetch(`${API_URL}/folders/${folderId}/visibility`, {
    method: 'PATCH',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error updating folder visibility')
  }
}

type UpdateFolderDto = {
  name: string
  public: boolean
}

export async function updateFolder(id: string, folder: UpdateFolderDto) {
  const response = await fetch(`${API_URL}/folders/${id}`, {
    method: 'PUT',
    headers: authHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(folder),
  })

  if (!response.ok) {
    throw new Error('Error updating folder')
  }

  const data: AppFolder = await response.json()

  data.createdAt = new Date(data.createdAt)
  data.updatedAt = new Date(data.updatedAt)

  return data
}

export async function deleteFolder(id: string) {
  const response = await fetch(`${API_URL}/folders/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error deleting folder')
  }
}
