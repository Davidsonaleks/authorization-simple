import React, { FC, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { AuthContext } from "./ctx"
import { useFetch } from "./fetch-hook"
import { useRoutes } from "./routes"

const LOCAL_STORAGE_NAME = "auth"

const App: FC = () => {
  const { request } = useFetch()
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const isAuth = !!token

  const login = (jwt: string) => {
    setToken(jwt)
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ token: jwt }))
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(LOCAL_STORAGE_NAME)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const storage: string | null = localStorage.getItem(LOCAL_STORAGE_NAME)
      const data = storage ? JSON.parse(storage) : null

      if (data && data.token) {
        const r: { isAuth: boolean } = await request("http://localhost:5002/auth/isAuth", "POST", { userToken: data.token })
        r && r.isAuth && login(data.token)
      }
    }
    checkAuth()
  }, [])

  const routes = useRoutes(isAuth)
  return (
    <AuthContext.Provider value={{ isAuth, login, logout, userId }}>
      <Router>
        {!isAuth && (
          <div>
            <Link to={"/signup"}>signup</Link>
            &nbsp;
            <Link to={"/signin"}>signin</Link>
          </div>
        )}
        {routes}
      </Router>
    </AuthContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
