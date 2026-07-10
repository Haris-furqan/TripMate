// hooks/useFetch.js
import { useState, useEffect } from 'react'

const useFetch = (url, timeout = 5000) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
      setError('Request timed out. Please try again.')
      setLoading(false)
    }, timeout)

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)

        const data = await res.json()
        clearTimeout(timer)
        setResult(data)
        setLoading(false)
      } catch (err) {
        if (!timedOut && err.name !== 'AbortError') {
          clearTimeout(timer)
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [url, timeout])

  return { result, loading, error }
}

export default useFetch