import { useEffect, useState } from "react"

export const useFetch = () => {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSnackShowing, showSnack] = useState<boolean>(false)

  const request = async (url: string, method: string = "GET", body: any = null) => {
    setLoading(true)
    try {
      const r = await fetch(url, {
        headers: { "Content-Type": "application/json;charset=utf-8" },
        method,
        body: JSON.stringify(body),
      })
      const data = await r.json()
      setMessage(data.message)

      if (!r.ok) {
        throw new Error(data.message)
      }

      return data
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!message) return
    showSnack(true)
    const timer = setTimeout(() => {
      showSnack(false)
      setMessage("")
    }, 3000)
    return () => clearTimeout(timer)
  }, [message])

  return { request, isLoading, message, isSnackShowing }
}
