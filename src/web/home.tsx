import React, { FC } from "react"
import { useAuth } from "./ctx"

export const HomePage: FC = () => {
  const auth = useAuth()
  return (
    <div>
      <div>HomePage</div>
      <button onClick={auth.logout}>logout</button>
    </div>
  )
}
HomePage.displayName = "HomePage"
