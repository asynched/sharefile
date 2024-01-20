import { useState } from 'react'

export function useToggle(initial = false) {
  const [toggle, setToggle] = useState(initial)

  const next = () => setToggle((prev) => !prev)

  return { toggle, next, setToggle }
}
