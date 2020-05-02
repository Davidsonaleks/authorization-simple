import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { HomePage } from "./home"
import { Signin } from "./signin"
import { Signup } from "./signup"

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage />{" "}
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Redirect to="/signup" />
      </Switch>
    )
  }
}
