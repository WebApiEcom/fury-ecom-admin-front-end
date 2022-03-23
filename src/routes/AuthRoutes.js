import React from "react";
import { Switch, Route } from "react-router-dom";
import NewItem from "../pages/NewItem";
import Insert from "../pages/Insert";
import Edit from "../pages/Edit";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
mport AddProduct from "../pages/AddProduct";i
import UpdateProduct from "../pages/UpdateProduct";
import ViewOrders from "../pages/ViewOrders";
import ViewOrder from "../pages/ViewOrder";

function AuthRoutes() {
  return (
    <Switch>
      {/* <Route path="/dashboard/product/:productId">
        <UpdateProduct />
      </Route>
      <Route path="/dashboard/edit/new">
        <NewItem />
      </Route>
      <Route path="/dashboard/insert">
        <Insert />
      </Route>
      <Route path="/dashboard/edit">
        <Edit />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="*">
        <NotFound /> */}

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
      <Route path="/view_orders">
        <ViewOrders />
      </Route>
      <Route path="/view_order/:id">
        <ViewOrder />
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
