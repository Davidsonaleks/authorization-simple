import { createContext, useContext } from "react"

type TAuthContext = {
  isAuth: boolean
  login: (jwt: string) => void
  logout: () => void
  userId: string | null
}

export const AuthContext = createContext<TAuthContext>(null as any)
export const useAuth = () => useContext(AuthContext)
