import { useEffect, useState } from 'react'

export const useDebounce = <ValueType>(value: ValueType, delay?: number): ValueType => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
