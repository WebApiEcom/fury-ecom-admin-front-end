import React from "react";
import { Switch, Route } from "react-router-dom";
import NewItem from "../pages/NewItem";
import Insert from "../pages/Insert";
import Edit from "../pages/Edit";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/add-product">
        <AddProduct />
      </Route>
      <Route path="/update/:productId">
        <UpdateProduct />
      </Route>
      <Route path="/edit/new">
        <NewItem />
      </Route>
      <Route path="/insert">
        <Insert />
      </Route>
      <Route path="/edit">
        <Edit />
      </Route>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default AuthRoutes;
