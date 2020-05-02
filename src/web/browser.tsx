import React, { FC } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"

const App: FC = () => {
  const routes = useRoutes(false)
  return <Router>{routes}</Router>
}

ReactDOM.render(<App />, document.getElementById("app"))
