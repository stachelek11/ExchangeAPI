import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomeView from "./HomeView";
import Details from "./Details/Details";
import MainTemplate from "../Template/MainTemplate";

const Root = () => (
  <>
    <Router>
      <Switch>
        <MainTemplate>
          <Route exact path="/" component={HomeView} />
          <Route path="/details/:symbol" component={Details} />
        </MainTemplate>
      </Switch>
    </Router>
  </>
);

export default Root;
