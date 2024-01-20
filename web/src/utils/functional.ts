export function inspect<T>(fn: (value: T) => unknown) {
  return (value: T) => {
    fn(value)
    return value
  }
}
