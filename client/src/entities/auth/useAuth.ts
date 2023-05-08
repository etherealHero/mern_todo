import { useState, useCallback, useEffect } from "react"

const storageName = "userData"

const init = JSON.parse(localStorage.getItem(storageName) || "{}").token || null

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(init)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken: string) => {
    setToken(jwtToken)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}")

    if (data && data.token) {
      login(data.token)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, ready }
}
