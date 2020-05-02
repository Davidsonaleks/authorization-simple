import React, { FC, useState } from "react"

type TAuthData = {
  login: string
  password: string
}

export const Signin: FC = () => {
  const [data, setData] = useState<TAuthData>({ login: "", password: "" })

  const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = {
      ...data,
      [e.target.name]: e.target.value,
    }
    setData(input)
  }

  const login = async () => {
    const res = await fetch("http://localhost:5002/auth/signin", {
      headers: { "Content-Type": "application/json;charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    })
    await res.json()
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
      <button onClick={login}>Go</button>
    </div>
  )
}
Signin.displayName = "Component"
