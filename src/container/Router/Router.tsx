import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Header from "../../components/header/Header";
import Login from "../Login/Login";

const useStyles = makeStyles({
  root: {
    height: '100vh',
    maxHeight: '100vh'
  }
})
const Router = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Dashboard />} />
        <Route path="/login" render={() => <Login/>} />
        <Route path="/settings" render={() => <div>List of setting</div>} />
      </Switch>
    </div>

  );
};

export default Router;
