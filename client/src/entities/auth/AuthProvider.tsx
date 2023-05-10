import { createContext, ReactNode, useContext } from "react"
import { useAuth } from "./useAuth"
import { Loader } from "../../shared"

interface IAuth {
  token: string | null
  login: (jwtToken: string) => void
  logout: () => void
  ready: boolean
}

function noop() {}

const initAuthContext: IAuth = {
  token: null,
  login: noop,
  logout: noop,
  ready: false,
}

const AuthContext = createContext<IAuth>(initAuthContext)

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, login, logout, ready } = useAuth()

  if (!ready) return <Loader />

  return (
    <AuthContext.Provider value={{ token, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
