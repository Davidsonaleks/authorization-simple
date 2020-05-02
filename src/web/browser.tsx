import React, { FC } from "react"
import ReactDOM from "react-dom"
import { Signin } from "./signin"
import { Signup } from "./signup"

const App: FC = () => {
  return (
    <div>
      <Signup />
      <Signin />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
