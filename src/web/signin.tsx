import React, { FC, useState } from "react"
import { useAuth } from "./ctx"
import { useFetch } from "./fetch-hook"
import { SnackBar } from "./snackbar"

type TAuthData = {
  login: string
  password: string
}

type TLogin = {
  token: string | null
  userId: string | null
}

export const Signin: FC = () => {
  const [data, setData] = useState<TAuthData>({ login: "", password: "" })
  const { request, isLoading, message, isSnackShowing } = useFetch()
  const { login } = useAuth()

  const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = {
      ...data,
      [e.target.name]: e.target.value,
    }
    setData(input)
  }

  const signin = async () => {
    const r: TLogin = await request("http://localhost:5002/auth/signin", "POST", data)
    r && r.token && login(r.token)
  }

  return (
    <div>
      <h1>Signin</h1>
      <label htmlFor="login">
        Email
        <input id="login" value={data.login} name="login" onChange={dataChange} />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" value={data.password} name="password" onChange={dataChange} />
      </label>
      <button onClick={signin} disabled={isLoading}>
        Signin
      </button>
      <SnackBar show={isSnackShowing} text={message} />
    </div>
  )
}
Signin.displayName = "Component"
