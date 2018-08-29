import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
      </Fragment>
    );
  }
}

export default App;
