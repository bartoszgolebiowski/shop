import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Dashboard />} />
      <Route path="/login" render={() => <div>Login</div>} />
      <Route path="/setting" render={() => <div>List of setting</div>} />
    </Switch>
  );
};

export default Router;
