import { API_URL } from 'src/config/env'
import { Profile } from 'src/domain/entities'

let token: string | null = localStorage.getItem('@auth:token')

export function getToken() {
  return token
}

export function setToken(newToken: string | null) {
  localStorage.setItem('@auth:token', newToken || '')
  token = newToken
}

type SignUpDto = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function signUp(data: SignUpDto) {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error creating user')
  }
}

type SignInDto = {
  email: string
  password: string
}

type SignInResponse = {
  token: string
}

export function authHeaders(headers: Record<string, string> = {}) {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  }
}

export async function signIn(data: SignInDto) {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const json: SignInResponse = await response.json()

  return json.token
}

export async function getProfile() {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'GET',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const profile: Profile = await response.json()

  return profile
}

type UpdateProfileDto = {
  firstName: string
  lastName: string
  email: string
}

export async function updateProfile(data: UpdateProfileDto) {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'PATCH',
    headers: authHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error updating profile')
  }
}
