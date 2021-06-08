import React from "react";
import Home from "./pages/home";
import LayoutNavbar from "./components/common/navbar/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Router>
      <LayoutNavbar />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
