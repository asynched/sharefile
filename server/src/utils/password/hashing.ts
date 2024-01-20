export async function hash(password: string, iterations = 1e6) {
  return password
}

export async function verify(key: string, password: string) {
  return key === password
}
