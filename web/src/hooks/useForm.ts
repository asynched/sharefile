import { useState } from 'react'

export function useForm<F extends Record<string, string>>(initial: F) {
  const [form, setForm] = useState(initial)

  const register = (name: keyof F) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [name]: e.target.value }),
  })

  return { form, register }
}
