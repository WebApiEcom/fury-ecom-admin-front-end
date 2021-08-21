import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Container from "../components/Container";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <ProtectedRoute path="/">
          <Container />
        </ProtectedRoute>

        <Route exact path="/">
          <Redirect exact from="/" to="/" />
        </Route>

        <Route path="*">
          <Redirect from="/" to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
