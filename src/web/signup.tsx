import React, { FC, useState } from "react"
import { useFetch } from "./fetch-hook"
import { SnackBar } from "./snackbar"

type TAuthData = {
  login: string
  password: string
}

export const Signup: FC = () => {
  const [data, setData] = useState<TAuthData>({ login: "", password: "" })
  const { request, isLoading, isSnackShowing, message } = useFetch()

  const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = {
      ...data,
      [e.target.name]: e.target.value,
    }
    setData(input)
  }

  const signup = async () => {
    await request("http://localhost:5002/auth/signup", "POST", data)
    // console.log("Message: ", message)
  }

  return (
    <div>
      <h1>Signup</h1>
      <label htmlFor="login">
        Email
        <input id="login" value={data.login} name="login" onChange={dataChange} />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" value={data.password} name="password" onChange={dataChange} />
      </label>
      <button onClick={signup} disabled={isLoading}>
        Signup
      </button>
      <SnackBar show={isSnackShowing} text={message} />
    </div>
  )
}
Signup.displayName = "Component"
